import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.authService.access_token}`)
    .set('Access-Control-Allow-Origin', 'http://localhost:8100')
    .append('Content-Type', 'application/json');

  // headers = new HttpHeaders().set('x - li - format', 'json');
  async getProfile() {
    return await this.http
      .get('https://api.linkedin.com/v1/profile/~', {
        headers: this.headers
      })
      .toPromise();
  }
}
