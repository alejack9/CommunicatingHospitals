import { Injectable } from '@angular/core';
import { ILatLng, Spherical } from '@ionic-native/google-maps/ngx';
import {
  GoogleMap,
  Marker,
  MarkerOptions,
  MarkerCluster,
  GoogleMapsEvent,
  GoogleMaps,
  Circle
} from '@ionic-native/google-maps';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: GoogleMap;
  private hospitalsMarkers: Array<MarkerOptions>;
  private myHospitalMarker: MarkerOptions;
  private markerCluster: MarkerCluster;

  set myHospital(v: any) {
    this.myHospitalMarker = this.objectToMarker(v, 'blue');
  }

  get myHospital() {
    return this.myHospitalMarker;
  }

  set nearbyHospitals(v: any[]) {
    this.hospitalsMarkers = [];
    v.forEach(e => {
      this.hospitalsMarkers.push(this.objectToMarker(e));
    });
  }
  get nearbyHospitals() {
    return this.hospitalsMarkers;
  }

  private objectToMarker(data: any, color: string = 'red'): MarkerOptions {
    return {
      position: {
        lat: data.coordinates.coordinates[0][1],
        lng: data.coordinates.coordinates[0][0]
      },
      name: data.name,
      icon: color,
      title: 'title'
    };
  }

  fillCluster() {
    if (this.markerCluster) {
      this.markerCluster.remove();
    }
    this.markerCluster = this.map.addMarkerClusterSync({
      markers: [...this.hospitalsMarkers, this.myHospitalMarker],
      icons: [
        {
          min: 3,
          max: 9,
          url: './assets/small.png',
          label: { color: 'white' }
        },
        {
          min: 10,
          url: './assets/large.png',
          label: { color: 'white' }
        }
      ]
    });

    this.markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(params => {
      const marker: Marker = params[1];
      marker.setTitle(marker.get('name'));
      marker.setSnippet(marker.get('address'));
      marker.showInfoWindow();
    });
  }

  loadMap(): Observable<any> {
    this.map = GoogleMaps.create('map_canvas');
    this.map.moveCamera({
      target: {
        lat: this.myHospitalMarker.position.lat,
        lng: this.myHospitalMarker.position.lng
      },
      zoom: 8
    });
    // this.hospitals.push(this.myHospitalMarker);
    this.fillCluster();
    const circle: Circle = this.map.addCircleSync({
      center: {
        lat: this.myHospitalMarker.position.lat,
        lng: this.myHospitalMarker.position.lng
      },
      radius: 100 * 1000,
      fillColor: 'rgba(0,0,0,0.2)',
      strokeColor: 'rgba(150,15,15,1)',
      strokeWidth: 3
    });
    // Calculate the positions
    const positions: ILatLng[] = [0, 90, 180, 270].map((degree: number) => {
      return Spherical.computeOffset(circle.getCenter(), 100 * 1000, degree);
    });

    const marker: Marker = this.map.addMarkerSync({
      icon: {
        url: '../../assets/bound.png',
        size: { height: 32, width: 32 }
      },
      position: positions[0],
      draggable: true,
      title: 'Drag me!'
    });
    marker.trigger(GoogleMapsEvent.MARKER_DRAG_END);
    this.drawCircle(circle, marker);

    marker.on('position_changed').subscribe(params => {
      this.drawCircle(circle, marker);
    });
    return marker.on(GoogleMapsEvent.MARKER_DRAG_END).pipe(
      map(par => {
        return {
          lat: this.myHospitalMarker.position.lat,
          lng: this.myHospitalMarker.position.lng,
          radius: circle.getRadius()
        };
      })
    );
  }

  drawCircle(circle: Circle, marker: Marker) {
    const newValue: ILatLng = marker.getPosition();
    const newRadius: number = Spherical.computeDistanceBetween(
      circle.getCenter(),
      newValue
    );
    circle.setRadius(newRadius);
  }
}
