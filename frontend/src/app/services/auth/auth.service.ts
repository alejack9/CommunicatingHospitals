import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {
  InAppBrowser,
  InAppBrowserObject
} from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: max-line-length
  // https://communicating-hospitals.eu.auth0.com/authorize?response_type=id_token token&client_id=hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3&redirect_uri=http://localhost:8100/callback&scope=openid profile&nonce=pawm&audience=http://localhost:3000
  private request =
    'https://' +
    environment.AUTH0_DOMAIN +
    '/authorize?response_type=id_token token&client_id=' +
    environment.AUTH0_CLIENTID +
    '&redirect_uri=' +
    environment.AUTH0_REDIRECTURL +
    '&scope=openid profile&nonce=pawm&audience=' +
    environment.AUTH0_AUDIENCE;
  private browser: InAppBrowserObject;

  private loggingStream = new Subject<boolean>();
  logging = false;

  // TODO
  private expiredIn: Date;

  constructor(private iab: InAppBrowser, private router: Router) {
    this.loggingStream.subscribe({
      complete: () => {
        this.logging = false;
      }
    });
  }

  login() {
    this.logging = true;
    this.browser = this.iab.create(this.request, '_blank');
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        localStorage.setItem('access_token', this.extractAccessToken(e.url));
        localStorage.setItem('id_token', this.extractIdToken(e.url));
        this.browser.close();
        this.loggingStream.complete();
      }
    });
    this.browser.show();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  extractAccessToken(url: string): string {
    return url.substring(
      url.indexOf('access_token=') + 13,
      url.indexOf('&', url.indexOf('access_token=')) === -1
        ? url.length
        : url.indexOf('&')
    );
  }

  extractIdToken(url: string): string {
    return url.substring(
      url.indexOf('id_token=') + 9,
      url.indexOf('&', url.indexOf('access_token=')) === -1
        ? url.length
        : url.indexOf('&')
    );
  }

  async isLogged() {
    if (this.logging) {
      await this.loggingStream.toPromise();
    }
    // TODO ADD 'EXPIRED?'
    return !!localStorage.getItem('access_token');
  }

  get access_token() {
    return localStorage.getItem('access_token');
  }

  get id_token() {
    return localStorage.getItem('id_token');
  }

  get profile() {
    if (this.id_token) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.id_token);
    }
  }
}
