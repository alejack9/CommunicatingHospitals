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
  constructor(
    private readonly iab: InAppBrowser,
    private readonly plt: Platform
  ) {
    this.helper = new JwtHelperService();
    this.plt.ready().then(() => this.checkToken());
  }
  private readonly url =
    'https://' +
    environment.AUTH0_DOMAIN +
    '/authorize?response_type=id_token token&client_id=' +
    environment.AUTH0_CLIENTID +
    '&redirect_uri=' +
    environment.AUTH0_REDIRECTURL +
    '&scope=openid profile offline_access&nonce=pawm&audience=' +
    environment.AUTH0_AUDIENCE;
  private browser: InAppBrowserObject;

  readonly authenticationState = new BehaviorSubject(false);

  private user = null;
  private readonly helper: JwtHelperService;
  /**
   *
   */
  get access_token() {
    return localStorage.getItem('access_token');
  }
  /**
   *
   */
  get profile() {
    return this.user;
  }
  /**
   *
   */
  private checkToken() {
    if (localStorage.getItem('id_token')) {
      if (!this.helper.isTokenExpired(localStorage.getItem('access_token'))) {
        this.user = this.helper.decodeToken(localStorage.getItem('id_token'));
        this.authenticationState.next(true);
      } else {
        this.logout();
      }
    }
  }
  /**
   *
   */
  login() {
    const options = [
      'location=no',
      'hidenavigationbuttons=yes',
      'hideurlbar=yes',
      'zoom=no',
      'clearcache=yes',
      'clearsessioncache=yes'
    ].join(',');
    this.browser = this.iab.create(this.url, '_blank', options);
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        this.browser.close();
        this.setTokens(
          this.getParam(e.url, 'access_token'),
          this.getParam(e.url, 'id_token')
        );
        this.authenticationState.next(true);
      }
    });
    this.browser.show();
  }
  /**
   *
   * @param accessToken
   * @param idToken
   */
  private setTokens(accessToken: string, idToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    this.user = this.helper.decodeToken(idToken);
  }
  /**
   *
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.authenticationState.next(false);
  }
  /**
   *
   * @param url
   * @param param
   */
  private getParam(url: string, param: string): string {
    param += '=';
    return url.substring(
      url.indexOf(param) + param.length,
      url.indexOf('&', url.indexOf(param)) === -1
        ? url.length
        : url.indexOf('&')
    );
  }
  /**
   *
   */
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
