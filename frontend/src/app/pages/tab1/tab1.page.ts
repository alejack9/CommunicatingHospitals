import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import {
  GoogleMaps,
  GoogleMap,
  MarkerCluster,
  GoogleMapsEvent,
  Marker,
  Spherical
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { Circle } from '@ionic-native/google-maps';
import { ILatLng } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private platform: Platform,
    private hospitalService: HospitalService
  ) {}
  map: GoogleMap;
  hospitals;
  myHospital;

  async ngOnInit() {
    await this.getMyHospital();
    await this.getNearbyHospitals();
    await this.platform.ready();
    await this.loadMap();
  }

  async getMyHospital() {
    this.myHospital = await this.hospitalService.getMyHospital();
    this.myHospital = this.elaborateData(this.myHospital, 'blue');
  }
  async getNearbyHospitals() {
    this.hospitals = await this.hospitalService.getHospitalsNearby(
      this.myHospital.position.lat, this.myHospital.position.lng, 100);
    this.hospitals = this.hospitals.filter(e => e.coordinates.coordinates[0][0] !== this.myHospital.position.lng &&
      e.coordinates.coordinates[0][1] !== this.myHospital.position.lat);
    this.hospitals = this.elaborateData(this.hospitals);
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.map.moveCamera({
      target: { lat:  this.myHospital.position.lat, lng: this.myHospital.position.lng },
      zoom: 8
    });
    this.hospitals.push(this.myHospital);
    this.addCluster(this.hospitals);
    const circle: Circle = this.map.addCircleSync({
      center: {lat: this.myHospital.position.lat, lng: this.myHospital.position.lng},
      radius: 100 * 1000,
      fillColor: 'rgba(0,0,0,0.2)',
      'strokeColor' : 'rgba(150,15,15,1)',
      'strokeWidth': 3,
    });
     // Calculate the positions
     let positions: ILatLng[] = [0, 90, 180, 270].map((degree: number) => {
      return Spherical.computeOffset(circle.getCenter(), 100 * 1000, degree);
    });

    const marker: Marker = this.map.addMarkerSync({
      position: positions[0],
      draggable: true,
      title: 'Drag me!'
    });
    // marker.trigger(GoogleMapsEvent.MARKER_CLICK);
    marker.trigger(GoogleMapsEvent.MARKER_DRAG_END);
    this.drawCircle(circle, marker);

    marker.on('position_changed').subscribe((params) => {
      this.drawCircle(circle, marker);
    });
    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((params) => {
      console.log(circle.getRadius());
    });

  }

  drawCircle(circle: Circle, marker) {
    const newValue: ILatLng = marker.getPosition();
    const newRadius: number = Spherical.computeDistanceBetween(circle.getCenter(), newValue);
    circle.setRadius(newRadius);
  }

  addCluster(data) {
    const markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [{
          min: 3,
          max: 9,
          url: './assets/small.png',
          label: { color: 'white' }
        }, {
          min: 10,
          url: './assets/large.png',
          label: { color: 'white' }
      }]
    });

    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(params => {
      const marker: Marker = params[1];
      marker.setTitle(marker.get('name'));
      marker.setSnippet(marker.get('address'));
      marker.showInfoWindow();
    });
  }

  elaborateData(data, color?) {
    if (Array.isArray(data)) {
      const toReturn = Array();
      data.forEach(e => {
      toReturn.push({
        position: {
          lat: e.coordinates.coordinates[0][1],
          lng: e.coordinates.coordinates[0][0]
        },
        name: e.name,
        icon: color || 'red',
        title: 'title'
      });
    });
    return toReturn;
  }
    return {
      position: {
        lat: data.coordinates.coordinates[0][1],
        lng: data.coordinates.coordinates[0][0]
      },
      name: data.name,
      icon: color || 'red',
      title: 'title'
    };
  }
}
