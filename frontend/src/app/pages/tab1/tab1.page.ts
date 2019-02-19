import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import {
  GoogleMaps,
  GoogleMap,
  MarkerCluster
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: GoogleMap;

  constructor(
    private platform: Platform,
    private hospitalService: HospitalService,
    private authService: AuthService
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
          lat: this.hospitalService.hospitals[0].coordinate[0],
          lng: this.hospitalService.hospitals[0].coordinate[1]
        },
        name: this.hospitalService.hospitals[0].name,

        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[1].coordinate[0],
          lng: this.hospitalService.hospitals[1].coordinate[1]
        },
        name: this.hospitalService.hospitals[1].name,
        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[2].coordinate[0],
          lng: this.hospitalService.hospitals[2].coordinate[1]
        },
        name: this.hospitalService.hospitals[2].name,
        icon: 'red'
      },
      {
        position: {
          lat: this.hospitalService.hospitals[3].coordinate[0],
          lng: this.hospitalService.hospitals[3].coordinate[1]
        },
        name: this.hospitalService.hospitals[3].name,
        icon: 'red'
      }
    ];
  }
}
