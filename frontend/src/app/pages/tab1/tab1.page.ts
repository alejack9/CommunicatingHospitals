import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Platform } from '@ionic/angular';
import { MapService } from './map.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public pepperoni = true;
  constructor(
    private platform: Platform,
    private hospitalService: HospitalService,
    private mapService: MapService
  ) {}
  hospitals: Array<any>;
  myHospital: any;

  async ngOnInit() {
    await this.getMyHospital();
    await this.getNearbyHospitals(
      this.myHospital.coordinates.coordinates[0][0],
      this.myHospital.coordinates.coordinates[0][1],
      100
    );

    await this.platform.ready();
    await this.mapService.loadMap().subscribe(params => {
      this.getNearbyHospitals(
        params.lat,
        params.lng,
        params.radius / 1000
      ).then(() => {
        this.mapService.fillCluster();
      });
    });
  }

  // ION CHANGE TOOGLE
  change() {
    console.log(this.pepperoni);
  }

  async getMyHospital() {
    this.myHospital = await this.hospitalService.getMyHospital();
    this.mapService.setMyHospital(this.myHospital);
  }
  async getNearbyHospitals(lat: number, lng: number, radius: number) {
    this.hospitals = await this.hospitalService.getHospitalsNearby(
      lat,
      lng,
      radius
    );

    this.hospitals.splice(
      this.hospitals.findIndex(
        e =>
          e.coordinates.coordinates[0][0] ===
            this.myHospital.coordinates.coordinates[0][0] &&
          e.coordinates.coordinates[0][1] ===
            this.myHospital.coordinates.coordinates[0][1]
      ),
      1
    );

    this.mapService.setNearbyHospitals(this.hospitals);
  }
}
