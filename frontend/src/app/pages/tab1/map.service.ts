import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  GoogleMap,
  MarkerCluster,
  GoogleMapsEvent,
  GoogleMaps,
  MarkerOptions
} from '@ionic-native/google-maps';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';
import { environment } from 'src/environments/environment';

export type Period = 'month' | 'year';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private readonly geolocation: Geolocation) {}

  private map: GoogleMap;
  private hospitalsMarkers = Array<MarkerOptions>();
  private myHospitalMarker: MarkerOptions;
  private markerCluster: MarkerCluster;

  getMyHospital(): MarkerOptions {
    return this.myHospitalMarker;
  }
  /**
   * set the parameters of your own marker
   * @param v
   * @param period
   */
  setMyHospital(v: Hospital, period: Period) {
    this.myHospitalMarker = this.hospitalToMarker(v, 'blue', period);
  }
  /**
   * set the parameters of the hospital markers
   * @param hospitals
   * @param period
   */
  setNearbyHospitals(hospitals: Hospital[], period: Period) {
    this.hospitalsMarkers.splice(
      0,
      this.hospitalsMarkers.length,
      ...hospitals.map(p => this.hospitalToMarker(p, undefined, period))
    );
    // this.hospitalsMarkers = [];
    // hospitals.forEach(e => {
    //   this.hospitalsMarkers.push(this.hospitalToMarker(e, undefined, period));
    // });
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
  async loadMap() {
    // : Observable<{ lat: number; lng: number; radius: number }> {
    this.map = GoogleMaps.create('map_canvas');
    let camera: { lat: number; lng: number } = !environment.production
      ? {
          lat: this.myHospitalMarker.position.lat,
          lng: this.myHospitalMarker.position.lng
        }
      : undefined;
    if (environment.production) {
      try {
        const a = await this.geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1
        });
        camera = {
          lat: a.coords.latitude,
          lng: a.coords.longitude
        };
      } catch (e) {
        camera = {
          lat: this.myHospitalMarker.position.lat,
          lng: this.myHospitalMarker.position.lng
        };
      }
    }
    this.map.moveCamera({
      target: {
        lat: camera.lat,
        lng: camera.lng
      },
      zoom: 9
    });
    this.fillCluster();
    this.map.trigger(GoogleMapsEvent.MAP_DRAG_END);
    return this.map.on(GoogleMapsEvent.MAP_DRAG_END).pipe(
      map(() => {
        return {
          NE: [
            this.map.getVisibleRegion().northeast.lng,
            this.map.getVisibleRegion().northeast.lat
          ],
          SW: [
            this.map.getVisibleRegion().southwest.lng,
            this.map.getVisibleRegion().southwest.lat
          ],
          SE: [
            this.map.getVisibleRegion().northeast.lng,
            this.map.getVisibleRegion().southwest.lat
          ],
          NW: [
            this.map.getVisibleRegion().southwest.lng,
            this.map.getVisibleRegion().northeast.lat
          ]
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
    this.map.setMyLocationButtonEnabled(true);
    this.map.setMyLocationEnabled(true);
  }

  /**
   * set the options to be displayed at the click of the marker
   * @param data
   * @param color
   * @param period
   */
  private hospitalToMarker(
    data: Hospital,
    color: string = 'red',
    period: Period = 'month'
  ): MarkerOptions {
    const rank = data.averageRanks.find(e => e.period === period);

    let title = 'Name: ' + data.name;
    if (rank) {
      rank.lastUpdate = new Date(rank.lastUpdate);
      title = title.concat(
        '\nRank: ' +
          (rank.rank + 1).toString() +
          '\nlast update: ' +
          rank.lastUpdate.getDate() +
          '/' +
          rank.lastUpdate.getMonth() +
          '/' +
          rank.lastUpdate.getFullYear()
      );
    }
    return {
      position: {
        lat: data.coordinates.coordinates[0][1],
        lng: data.coordinates.coordinates[0][0]
      },
      styles: {
        'text-align': 'center'
      },
      title,
      icon: color
    };
  }
}
