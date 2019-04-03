import { Point } from './../../common/dtos/point';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Platform } from '@ionic/angular';
import { MapService, Period } from './map.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private platform: Platform,
    private hospitalService: HospitalService,
    private mapService: MapService
  ) {}
  hospitals: Array<any>;
  myHospital: any;
  period: Period = 'month';

  async ngOnInit() {
    try {
      await this.getMyHospital();
    } catch (e) {
      if (e.status === 403) {
        return;
      }
    }
    await this.getNearbyHospitals(
      this.myHospital.coordinates.coordinates[0][1],
      this.myHospital.coordinates.coordinates[0][0],
      100
    );

    await this.platform.ready();
    this.mapService.loadMap().then(map => {
      map.subscribe(params => {
        this.getNearbyHospitalsV2(params.NE, params.SW).then(() => {
          this.mapService.fillCluster();
        });
      });
    });
    this.mapService.fillCluster();
  }

  /**
   * get your own hospital
   */
  async getMyHospital() {
    this.myHospital = await this.hospitalService.getMyHospital();
    this.mapService.setMyHospital(this.myHospital, this.period);
  }
  /**
   * recover hospitals close to your found hospital
   * @param lat
   * @param lng
   * @param radius
   */
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
    this.mapService.setNearbyHospitals(this.hospitals, this.period);
  }

  async getNearbyHospitalsV2(NE: Point, SW: Point) {
    this.hospitals = await this.hospitalService.getHospitalsNearbyV2(NE, SW);
    const toRemove = this.hospitals.findIndex(
      e => e._id === this.myHospital._id
    );
    if (toRemove !== -1) {
      this.hospitals.splice(
        this.hospitals.findIndex(e => e._id === this.myHospital._id),
        1
      );
    }
    this.mapService.setNearbyHospitals(this.hospitals, this.period);
  }
  /**
   * possibility to dynamically search hospitals and redraw the map
   * @param e
   */
  segmentChanged(e) {
    this.period = e.detail.value;
    this.mapService.setMyHospital(this.myHospital, this.period);
    this.mapService.setNearbyHospitals(this.hospitals, this.period);
    this.mapService.fillCluster();
  }
}
