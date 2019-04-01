import { Point } from './../../common/dtos/point';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  // header setting to make http requests
  constructor(private http: HttpClient) {}

  /**
   * returns all hospitals after an http request based on the distance indicated by the point
   * @param lat
   * @param lng
   * @param distance
   */
  async getHospitalsNearby(lat: Number, lng: Number, distance: Number) {
    const params = new HttpParams()
      .set('longitude', lng.toString())
      .set('latitude', lat.toString())
      .set('distance', distance.toString());
    return (await this.http
      .get(environment.BACKEND + 'hospitals/location', {
        params
      })
      .toPromise()) as Array<Hospital>;
  }

  async getHospitalsNearbyV2(NE: Point, SW: Point) {
    const params = new HttpParams()
      .set('NE', JSON.stringify(NE))
      .set('SW', JSON.stringify(SW));
    return (await this.http
      .get(environment.BACKEND + 'hospitals/v2/location', {
        params
      })
      .toPromise()) as Array<Hospital>;
  }
  /**
   * returns his hospital
   */
  async getMyHospital() {
    return await this.http
      .get(environment.BACKEND + 'hospitals/myHospital', {})
      .toPromise();
  }
}
