import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  status;
  data;
  result: Object[];
  loading: boolean;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.result = [];
    this.loading = false;
  }

  convert() {
    return this.data;
  }

  getHospitalsNearBy(): Promise<any> {
    console.log('TOKEN');
    console.log(this.authService.getAccessToken());
    // const headers = {
    //   Authorization: 'Bearer ' + this.authService.getAccessToken(),
    //   'Access-Control-Allow-Origin': 'http://localhost:8100',
    //   'Content-Type': 'application/json'
    // };
    const headers = new HttpHeaders()
      .set('token', this.authService.getAccessToken())
      .set('Access-Control-Allow-Origin', 'http://localhost:8100')
      .set('Content-Type', 'application/json');
    return this.http
      .get<Hospital>(environment.BACKEND + 'hospitals/location', {
        headers: headers,
        params: { longitude: '12.272', latitude: '43.088', distance: '300' }
      })
      .toPromise();
    // .subscribe(data => {
    //   this.data = data;
    //   console.log('qwerty' + data);
    // });
    // this.data = JSON.parse(data.toPromise());
    // return this.data;
    // return this.data;
    // const data = await this.http.get(
    //   environment.BACKEND + 'hospitals/location',
    //   { longitude: '12.272', latitude: '43.088', distance: '300' },
    //   headers
    // );
    // return this.httpClient.get(url, { params }).toPromise();
    // this.data = JSON.parse(data.data);
    // return this.data;
  }
}
