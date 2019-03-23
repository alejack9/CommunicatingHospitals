import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Platform } from '@ionic/angular';
import { MapService, Period } from './map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private platform: Platform,
    private hospitalService: HospitalService,
    private mapService: MapService,
    private router: Router
  ) {}
  hospitals: Array<any>;
  myHospital: any;
  period: Period = 'month';

  async ngOnInit() {
    try {
      await this.getMyHospital();
    } catch (e) {
      if (e.status === 401 || e.status === 403) {
        this.router.navigate(['/unauthorized']);
      }
    }
    await this.getNearbyHospitals(
      this.myHospital.coordinates.coordinates[0][1],
      this.myHospital.coordinates.coordinates[0][0],
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
