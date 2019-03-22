import { HttpClient } from '@angular/common/http';
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
  // https://communicating-hospitals.eu.auth0.com/authorize?response_type=code&client_id=hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3&redirect_uri=http://localhost:8100/callback&scope=openid profile offline_access&nonce=pawm&audience=http://localhost:3000&state=thisIsATry

  constructor(
    private readonly iab: InAppBrowser,
    private readonly plt: Platform,
    private httpClient: HttpClient
  ) {
    this.helper = new JwtHelperService();
    this.plt.ready().then(() => this.checkToken());
  }

  private readonly codeUrl =
    'https://' +
    environment.AUTH0_DOMAIN +
    '/authorize?response_type=code&client_id=' +
    environment.AUTH0_CLIENTID +
    '&redirect_uri=' +
    environment.AUTH0_REDIRECTURL +
    '&scope=openid profile offline_access&nonce=pawm&audience=' +
    environment.AUTH0_AUDIENCE +
    '&state=thisIsATry';
  private browser: InAppBrowserObject;

  readonly authenticationState = new BehaviorSubject(false);

  private user = null;
  private readonly helper: JwtHelperService;

  get access_token() {
    return localStorage.getItem('access_token');
  }

  get profile() {
    return this.user;
  }

  private checkToken() {
    if (localStorage.getItem('refresh_token')) {
      if (!this.helper.isTokenExpired(localStorage.getItem('access_token'))) {
        this.user = this.helper.decodeToken(localStorage.getItem('id_token'));
        this.authenticationState.next(true);
      } else {
        this.getTokens();
      }
    }
  }

  private async httpTokensRequest(options) {
    return await this.httpClient
      .post(`https://${environment.AUTH0_DOMAIN}/oauth/token`, options, {
        headers: { 'content-type': 'application/json' }
      })
      .toPromise();
  }

  private async getTokens(code?: string) {
    let options;
    if (code) {
      options = {
        grant_type: 'authorization_code',
        client_id: environment.AUTH0_CLIENTID,
        code,
        redirect_uri: environment.AUTH0_REDIRECTURL
      };
    } else {
      options = {
        grant_type: 'refresh_token',
        client_id: environment.AUTH0_CLIENTID,
        refresh_token: localStorage.getItem('refresh_token')
      };
    }
    const res = await this.httpTokensRequest(options);

    localStorage.setItem('access_token', res['access_token']);
    localStorage.setItem('id_token', res['id_token']);
    if (res['refresh_token']) {
      localStorage.setItem('refresh_token', res['refresh_token']);
    }
    this.authenticationState.next(true);
  }

  login() {
    const options = [
      'location=no',
      'hidenavigationbuttons=yes',
      'hideurlbar=yes',
      'zoom=no',
      'clearcache=yes',
      'clearsessioncache=yes'
    ].join(',');
    this.browser = this.iab.create(this.codeUrl, '_blank', options);
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        this.browser.close();
        this.getTokens(this.getParam(e.url, 'code'));
      }
    });
    this.browser.show();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    this.authenticationState.next(false);
  }

  private getParam(url: string, param: string): string {
    param += '=';
    return url.substring(
      url.indexOf(param) + param.length,
      url.indexOf('&', url.indexOf(param)) === -1
        ? url.length
        : url.indexOf('&')
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
