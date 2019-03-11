import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Hospital } from 'src/app/common/interfaces/hospital.interface';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  status;
  data;
  result: Object[];
  loading: boolean;

  constructor(private http: HTTP, private authService: AuthService) {
    // this.hospitals = new Promise(() => {
    //   this.data.JsonParse();
    // });
    this.result = [];
    this.loading = false;
  }

  convert() {
    return this.data;
  }
  async getHospitalsNearBy() {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken(),
      'Access-Control-Allow-Origin': 'http://localhost:8100',
      'Content-Type': 'application/json'
    };
    const data = await this.http.get(
      environment.BACKEND + 'hospitals/location',
      { longitude: '12.272', latitude: '43.088', distance: '300' },
      headers
    );
    this.data = JSON.parse(data.data);
    return this.data;
  }

  // getHospitalsNearBy(): Observable<Hospital[]> {
  //   const headers = {
  //     Authorization: 'Bearer ' + this.authService.getAccessToken(),
  //     'Access-Control-Allow-Origin': 'http://localhost:8100',
  //     'Content-Type': 'application/json'
  //   };
  //   return this.http
  //     .get(
  //       environment.BACKEND + 'hospitals/location',
  //       { longitude: '12.272', latitude: '43.088', distance: '100' },
  //       headers
  //     )
  //     .map((response: Response) => {
  //       response.json();
  //     })
  //     .do(data => console.log(data))
  //     .catch(this.handlError);
  // }

  // private handlError(err: Response) {
  //   console.error(err);
  //   const message = ' Error tus code';
  //   return Observable.throw(message);
  // }

  // getHospitalsInNerby() {
  //   this.status = undefined;
  //   this.data = undefined;
  //   const headers = {
  //     Authorization: 'Bearer ' + this.authService.getAccessToken(),
  //     'Access-Control-Allow-Origin': 'http://localhost:8100',
  //     'Content-Type': 'application/json'
  //   };

  //   this.http.setDataSerializer('json');

  //   this.http
  //     .get(
  //       environment.BACKEND + 'hospitals/location',
  //       { longitude: '12.272', latitude: '43.088', distance: '100' },
  //       headers
  //     )
  //     .then(data => {
  //       this.status = data.status;
  //       this.data = data.data; // data received by server
  //     })
  //     .catch(error => {
  //       console.log('male?');
  //       console.log(error);
  //       console.log(error.error); // error message as string
  //       console.log(error.headers);
  //     });
  // }
}
