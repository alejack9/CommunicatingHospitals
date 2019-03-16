import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  constructor(private authService: AuthService, private http: HTTP) {}

  getPreparations() {
    if (this.authService.isReady() && this.authService.isAuthenticated()) {
      const headers = new HttpHeaders()
        .append('token', this.authService.getAccessToken())
        .append('Access-Control-Allow-Origin', 'http://localhost:8100')
        .append('Content-Type', 'application/json');
      console.log('TOKEN ' + this.authService.getAccessToken());
      this.http
        .get(
          environment.BACKEND + 'preparations/Drops',
          { longitude: '12.272', latitude: '43.088', distance: '100' },
          headers
        )
        // this.http
        //   .get(environment.BACKEND + 'preparations/Drops', headers, {
        //     start: ' ',
        //     end:''
        //   })

        .then(data => {
          // this.status = data.status;
          // this.data = data.data; // data received by server
        })
        .catch(error => {
          // console.log('male?');
          // console.log(error);
          // console.log(error.error); // error message as string
          // console.log(error.h
        });
    }
  }
}
