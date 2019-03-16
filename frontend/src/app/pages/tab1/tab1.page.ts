import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import {
  GoogleMaps,
  GoogleMap,
  MarkerCluster,
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
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
    private hospitalService: HospitalService
  ) {}
  map: GoogleMap;
  hospitals;
  done = false;
  errorMessage: string;

  array = [];
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
    this.map.moveCamera({
      target: { lat: 21.382314, lng: -157.933097 },
      zoom: 10
    });
    this.addCluster(this.dummyData());
  }

  addCluster(data) {
    const markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 3,
          max: 9,
          url: './assets/small.png',
          label: {
            color: 'white'
          }
        },
        {
          min: 10,
          url: './assets/large.png',
          label: {
            color: 'white'
          }
        }
      ]
    });

    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(params => {
      const marker: Marker = params[1];
      marker.setTitle(marker.get('name'));
      marker.setSnippet(marker.get('address'));
      marker.showInfoWindow();
    });
  }

  // dummyData() {
  //   console.log('DATAAAA');
  //   console.log(this.hospitalService.data);
  //   const toReturn = Array();
  //   this.hospitalService.data.forEach(e => {
  //     toReturn.push({
  //       position: {
  //         lat: e.coordinates.coordinates[0][1],
  //         lng: e.coordinates.coordinates[0][0]
  //       },
  //       name: e.name,
  //       icon: 'red',
  //       title: 'title'
  //     });
  //   });
  //   return toReturn;
  // }
  dummyData() {
    return [
      {
        position: {
          lat: 21.382314,
          lng: -157.933097
        },

        snippet: 'aiutooo',
        name: 'Starbucks - HI - Aiea  03641',
        address:
          'Aiea Shopping Center_99-115\nAiea Heights Drive #125_Aiea, Hawaii 96701',
        icon: 'blue'
      },
      {
        position: {
          lat: 21.78,
          lng: -157.9482
        },
        name: 'Starbucks - HI - Aiea  03642',
        address: 'Pearlridge Center_98-125\nKaonohi Street_Aiea, Hawaii 96701',
        icon: 'red'
      },
      {
        position: {
          lat: 21.57,
          lng: -157.928275
        },
        name: 'Starbucks - HI - Aiea  03643',
        address:
          'Stadium Marketplace_4561\nSalt Lake Boulevard_Aiea, Hawaii 96818',
        icon: 'red'
      }
    ];
  }

  getHospitals() {
    // if (
    //   !this.done &&
    //   this.authService.isAuthenticated() &&
    //   this.authService.isReady()
    // ) {
    this.hospitalService.getHospitalsNearBy();
    this.done = true;

    // console.log(JSON.stringify(this.hospitalService.hospital));
    // }
  }
}
