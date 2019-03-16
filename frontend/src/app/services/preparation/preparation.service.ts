import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  async getPreparations() {
    if(await this.authService.isLogged()) {
      const headers = new HttpHeaders()
        .append('token', this.authService.access_token)
        .append('Access-Control-Allow-Origin', 'http://localhost:8100')
        .append('Content-Type', 'application/json');
      this.http
        .get(
          environment.BACKEND + 'preparations/Drops',
          { headers: headers, params: {  longitude: '12.272', latitude: '43.088', distance: '100' }},
        )
        // this.http
        //   .get(environment.BACKEND + 'preparations/Drops', headers, {
        //     start: ' ',
        //     end:''
        //   })
          .toPromise()
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
