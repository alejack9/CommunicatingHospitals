import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import {
  GoogleMaps,
  GoogleMap,
  MarkerCluster
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private platform: Platform,
    private hospitalService: HospitalService,
    private authService: AuthService,
    public loadingController: LoadingController
  ) {}
  map: GoogleMap;
  hospitals;
  done = false;
  errorMessage: string;
  aaaa = false;
  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    //    this.getHospitals();
    console.log('GETTING HOSPITALS');
    await this.getHospitals();
    console.log('GOTTEN HOSPITALS');
    console.log('PREPARING MAP');
    await this.platform.ready();
    console.log('MAP READY');
    console.log('LOADING MAP');
    await this.loadMap();
    console.log('MAP LOADED');
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
    const toReturn = Array();
    this.hospitalService.data.forEach(e => {
      toReturn.push({
        position: {
          lat: e.coordinates.coordinates[0][1],
          lng: e.coordinates.coordinates[0][0]
        },
        name: e.name,
        icon: 'red',
        title: 'title'
      });
    });
    return toReturn;
    // return [
    //   {
    //     position: {
    //       lat: this.hospitalService.data[0].coordinates.coordinates[0][1],
    //       lng: this.hospitalService.data[0].coordinates.coordinates[0][0]
    //     },
    //     name: this.hospitalService.data[0].name,
    //     icon: 'red'
    //   },
    //   {
    //     position: {
    //       lat: this.hospitalService.data[1].coordinates.coordinates[0][1],
    //       lng: this.hospitalService.data[1].coordinates.coordinates[0][0]
    //     },
    //     name: this.hospitalService.data[1].name,
    //     icon: 'red'
    //   }
    // ];
  }
  async getHospitals() {
    if (
      !this.done &&
      this.authService.isAuthenticated() &&
      this.authService.isReady()
    ) {
      await this.hospitalService.getHospitalsNearBy();
      this.done = true;
      console.log(this.hospitalService.convert());
    }
  }
}
