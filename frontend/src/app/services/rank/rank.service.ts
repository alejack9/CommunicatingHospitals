import { environment } from './../../../environments/environment.prod';
import { Period } from './../../pages/tab1/map.service';
import { PreparationType } from 'src/app/common/interfaces/preparationType.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  get headers() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.access_token}`)
      .append('Access-Control-Allow-Origin', 'http://localhost:8100')
      .append('Content-Type', 'application/json');
  }

  async getRank(type: PreparationType, dateUnit: Period | 'day') {
    return (await this.http
      .get(environment.BACKEND + `ranking/${type}`, {
        params: { dateUnit },
        headers: this.headers
      })
      .toPromise()) as Array<{ ranking: number; name: string; avg: number }>;
  }
}
