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
  constructor(private http: HttpClient) {}
  
  async getRank(type: PreparationType, dateUnit: Period | 'day') {
    return (await this.http
      .get(environment.BACKEND + `ranking/${type}`, {
        params: { dateUnit },
      })
      .toPromise()) as Array<{ ranking: number; name: string; media: number }>;
  }
  async getMyRank(type: PreparationType, dateUnit: Period | 'day') {
    return await this.http
      .get(environment.BACKEND + `ranking/${type}/me`, {
        params: { dateUnit },
      })
      .toPromise();
  }
}
