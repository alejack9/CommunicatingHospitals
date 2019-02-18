import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import {
  GoogleMaps,
  GoogleMap,
  MarkerCluster
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: GoogleMap;

  constructor(
    private platform: Platform,
    private hospitalService: HospitalService
  ) {}

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.addCluster(this.dummyData());
  }
  addCluster(data) {
    const markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 3,
          max: 9,
          url: './assets/markercluster/small.png',
          label: {
            color: 'white'
          }
        },
        {
          min: 10,
          url: './assets/markercluster/large.png',
          label: {
            color: 'white'
          }
        }
      ]
    });
  }

  dummyData() {
    return [
      {
        position: {
          lat: this.hospitalService.hospitals[0].coordinate.lat,
          lng: this.hospitalService.hospitals[0].coordinate.lng
        },
        name: this.hospitalService.hospitals[0].name,
        address: this.hospitalService.hospitals[0].description,
        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[1].coordinate.lat,
          lng: this.hospitalService.hospitals[1].coordinate.lng
        },
        name: this.hospitalService.hospitals[1].name,
        address: this.hospitalService.hospitals[1].description,
        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[2].coordinate.lat,
          lng: this.hospitalService.hospitals[2].coordinate.lng
        },
        name: this.hospitalService.hospitals[2].name,
        address: this.hospitalService.hospitals[2].description,
        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[3].coordinate.lat,
          lng: this.hospitalService.hospitals[3].coordinate.lng
        },
        name: this.hospitalService.hospitals[3].name,
        address: this.hospitalService.hospitals[3].description,
        icon: 'red'
      }
    ];
  }
}
