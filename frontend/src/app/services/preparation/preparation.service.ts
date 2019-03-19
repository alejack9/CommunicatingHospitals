import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PreparationType } from 'src/app/common/interfaces/preparationType.interface';
import { DatePipe } from '@angular/common';
import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  private headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.authService.access_token}`)
    .append('Access-Control-Allow-Origin', 'http://localhost:8100')
    .append('Content-Type', 'application/json');

  async getPreparationTypes() {
    return await this.http
      .get(environment.BACKEND + 'hospitals/preparationsTypes', {
        headers: this.headers
      })
      .toPromise();
  }

  async getPrepration(type: PreparationType, start: Date, end: Date) {
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString());

    const tor = (await this.http
      .get(environment.BACKEND + 'preparations/' + type, {
        headers: this.headers,
        params
      })
      .toPromise()) as Array<Preparation>;
    return tor;
  }

  extractData(p: Preparation[]) {
    return p.map(prep => {
      return {
        numberOfPreparations: prep.numberOfPreparations,
        date: prep.date
      };
    });
  }
}
