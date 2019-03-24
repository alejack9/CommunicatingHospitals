import { Injectable } from '@angular/core';
import { ILatLng, Spherical } from '@ionic-native/google-maps/ngx';
import {
  GoogleMap,
  Marker,
  MarkerCluster,
  GoogleMapsEvent,
  GoogleMaps,
  Circle,
  MarkerOptions
} from '@ionic-native/google-maps';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';

export type Period = 'month' | 'year';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: GoogleMap;
  private hospitalsMarkers: Array<MarkerOptions>;
  private myHospitalMarker: MarkerOptions;
  private markerCluster: MarkerCluster;
  /**
   *
   */
  getMyHospital(): MarkerOptions {
    return this.myHospitalMarker;
  }
  /**
   * set the parameters of your own marker
   * @param v
   * @param period
   */
  setMyHospital(v: Hospital, period: Period) {
    this.myHospitalMarker = this.objectToMarker(v, 'blue', period);
  }
  /**
   * set the parameters of the hospital markers
   * @param v
   * @param period
   */
  setNearbyHospitals(v: Hospital[], period: Period) {
    this.hospitalsMarkers = [];
    v.forEach(e => {
      this.hospitalsMarkers.push(this.objectToMarker(e, undefined, period));
    });
  }
  /**
   * returns hospital markers
   */
  getNearbyHospitals(): MarkerOptions[] {
    return this.hospitalsMarkers;
  }

  /**
   * load the map with related options
   */
  loadMap(): Observable<{ lat: number; lng: number; radius: number }> {
    this.map = GoogleMaps.create('map_canvas');
    this.map.moveCamera({
      target: {
        lat: this.myHospitalMarker.position.lat,
        lng: this.myHospitalMarker.position.lng
      },
      zoom: 8
    });
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
      icon: 'green',
      position: positions[0],
      draggable: true,
      title: 'Drag me!'
    });
    marker.trigger(GoogleMapsEvent.MARKER_CLICK);
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
  /**
   * fill the Cluster marker with all the hospitals found to add to the map
   */

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
    this.markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(m => {
      if (m[1]) {
        m[1].showInfoWindow();
      }
    });
    this.markerCluster.trigger(GoogleMapsEvent.MARKER_CLICK);
  }
  /**
   * draw the circle that allows the dynamic search of the neighboring osepdals
   * @param circle
   * @param marker
   */
  drawCircle(circle: Circle, marker: Marker) {
    const newValue: ILatLng = marker.getPosition();
    const newRadius: number = Spherical.computeDistanceBetween(
      circle.getCenter(),
      newValue
    );
    circle.setRadius(newRadius);
  }
  /**
   * set the options to be displayed at the click of the marker
   * @param data
   * @param color
   * @param period
   */
  private objectToMarker(
    data: Hospital,
    color: string = 'red',
    period: Period = 'month'
  ): MarkerOptions {
    let rank;
    rank = data.averageRanks.find(e => e.period === period);
    if (rank) {
      rank.lastUpdate = new Date(rank.lastUpdate);
    }
    return {
      position: {
        lat: data.coordinates.coordinates[0][1],
        lng: data.coordinates.coordinates[0][0]
      },
      styles: {
        'text-align': 'center'
      },
      title:
        'Name: ' + data.name + rank
          ? '\nRank: ' +
            (rank.rank + 1).toString() +
            '\nlast update: ' +
            rank.lastUpdate.getDate() +
            '/' +
            rank.lastUpdate.getMonth() +
            '/' +
            rank.lastUpdate.getFullYear()
          : '',
      icon: color
    };
  }
}
