import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {
  InAppBrowser,
  InAppBrowserObject
} from '@ionic-native/in-app-browser/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: max-line-length
  // https://communicating-hospitals.eu.auth0.com/authorize?response_type=id_token token&client_id=hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3&redirect_uri=http://localhost:8100/callback&scope=openid profile&nonce=pawm&audience=http://localhost:3000
  private readonly url =
    'https://' +
    environment.AUTH0_DOMAIN +
    '/authorize?response_type=id_token token&client_id=' +
    environment.AUTH0_CLIENTID +
    '&redirect_uri=' +
    environment.AUTH0_REDIRECTURL +
    '&scope=openid profile&nonce=pawm&audience=' +
    environment.AUTH0_AUDIENCE;
  private browser: InAppBrowserObject;

  readonly authenticationState = new BehaviorSubject(false);

  private user = null;
  private readonly helper: JwtHelperService;
  constructor(
    private readonly iab: InAppBrowser,
    private readonly plt: Platform
  ) {
    this.helper = new JwtHelperService();
    this.plt.ready().then(() => this.checkToken());
  }

  checkToken() {
    if (localStorage.getItem('id_token')) {
      const decodedUser = this.helper.decodeToken(
        localStorage.getItem('id_token')
      );
      const isExpired = this.helper.isTokenExpired(
        localStorage.getItem('acess_token')
      );
      if (!isExpired) {
        this.user = decodedUser;
        this.authenticationState.next(true);
      } else {
        this.logout();
      }
    }
  }

  login() {
    // this.authenticationState.next(true);
    console.log('logging in ' + this.url);
    this.browser = this.iab.create(this.url, '_blank');
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        localStorage.setItem('access_token', this.extractAccessToken(e.url));
        localStorage.setItem('id_token', this.extractIdToken(e.url));
        this.browser.close();
        this.authenticationState.next(true);
      }
    });
    this.browser.show();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.authenticationState.next(false);
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
      url.indexOf('&', url.indexOf('id_token=')) === -1
        ? url.length
        : url.indexOf('&')
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  get access_token() {
    return localStorage.getItem('access_token');
  }

  // get id_token() {
  //   return localStorage.getItem('id_token');
  // }

  get profile() {
    return this.user;
  }
}
