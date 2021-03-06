import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PreparationType } from 'src/app/common/interfaces/preparationType.interface';
import { Preparation } from 'src/app/common/interfaces/preparation.interface';
import { TypeRank } from 'src/app/common/interfaces/type-rank.interface';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  constructor(private http: HttpClient) {}

  /**
   * retrieve the list of preparations indicating the type
   */
  async getPreparationTypes() {
    return await this.http
      .get(environment.BACKEND + 'hospitals/preparationsTypes')
      .toPromise();
  }
  /**
   * returns a preparation array based on the entered parameters
   * @param type
   * @param start
   * @param end
   */
  async getPreprations(type: PreparationType, start: Date, end: Date) {
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString());

    return (await this.http
      .get(environment.BACKEND + 'preparations/' + type, {
        params
      })
      .toPromise()) as Array<Preparation>;
  }
  /**
   *  extracts from a list of preparations your own number of prepos and the associated date
   * @param p
   */
  extractData(p: Preparation[]) {
    return p.map(prep => {
      return {
        numberOfPreparations: prep.numberOfPreparations,
        date: prep.date
      };
    });
  }
}
