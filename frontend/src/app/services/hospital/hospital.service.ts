import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.authService.access_token}`)
    .append('Access-Control-Allow-Origin', 'http://localhost:8100')
    .append('Content-Type', 'application/json');
  constructor(private http: HttpClient, private authService: AuthService) {}

  async getHospitalsNearby(lat: Number, lng: Number, distance: Number) {
    const params = new HttpParams()
      .set('longitude', lng.toString())
      .set('latitude', lat.toString())
      .set('distance', distance.toString());
    return (await this.http
      .get(environment.BACKEND + 'hospitals/location', {
        headers: this.headers,
        params
      })
      .toPromise()) as Array<Hospital>;
  }

  async getMyHospital() {
    return await this.http
      .get(environment.BACKEND + 'hospitals/myHospital', {
        headers: this.headers
      })
      .toPromise();
  }
}
