import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly iab: InAppBrowser,
    private readonly plt: Platform,
    private readonly http: HttpClient
  ) {
    this.plt.ready().then(() => this.checkToken());
  }

  readonly authenticationState = new BehaviorSubject(false);
  private readonly helper = new JwtHelperService();
  private user = null;

  private checkToken() {
    if (localStorage.getItem('id_token')) {
      const decodedUser = this.helper.decodeToken(
        localStorage.getItem('id_token')
      );
      const isExpired = this.helper.isTokenExpired(
        localStorage.getItem('access_token')
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
    // tslint:disable-next-line: max-line-length
    // https://communicating-hospitals.eu.auth0.com/authorize?response_type=code&client_id=hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3&redirect_uri=http://localhost:8100/callback&scope=openid profile offline_access&nonce=pawm&audience=http://localhost:3000
    const url =
      'https://' +
      environment.AUTH0_DOMAIN +
      // '/authorize?response_type=id_token token&client_id=' +
      '/authorize?response_type=code&client_id=' +
      environment.AUTH0_CLIENTID +
      '&redirect_uri=' +
      environment.AUTH0_REDIRECTURL +
      '&scope=openid profile offline_access&nonce=pawm&audience=' +
      environment.AUTH0_AUDIENCE;

    const options = [
      'location=no',
      'hidenavigationbuttons=yes',
      'hideurlbar=yes',
      'zoom=no',
      'clearsessioncache=yes',
      'clearcache=yes'
    ].join(',');
    console.log('hi everyone');
    const browser = this.iab.create(url, '_blank', options);
    browser.on('loadstart').subscribe(e => {
      console.log('aaa');
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        const code = this.getParam(e.url, 'code');
        this.requireTokens(code);
        // this.getParam(e.url, 'access_token');
        // this.getParam(e.url, 'id_token');
        // this.setTokens(...this.requireTokens(code));
        browser.close();
        this.authenticationState.next(true);
      }
    });
    browser.show();
  }

  private setTokens(accessToken: string, idToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    this.user = this.helper.decodeToken(idToken);
  }

  private requireTokens(code: string) {
    // const options = {
    //   method: 'POST',
    //   url: 'https://' + environment.AUTH0_DOMAIN + '/oauth/token',
    //   headers: { 'content-type': 'application/json' },
    //   body: {
    //     grant_type: 'authorization_code',
    //     client_id: environment.AUTH0_CLIENTID,
    //     code: code,
    //     redirect_uri: environment.AUTH0_REDIRECTURL
    //   },
    //   json: true
    // };

    this.http
      .post(
        'https://' + environment.AUTH0_DOMAIN + '/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: environment.AUTH0_CLIENTID,
          code: code,
          redirect_uri: environment.AUTH0_REDIRECTURL
        },
        { headers: { 'content-type': 'application/json' } }
      )
      .toPromise()
      .then(e => console.log(e));

    // request(options, function(error, res, body) {
    //   if (error) {
    //     throw new Error(error);
    //   }

    //   console.log(body);
    // });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
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

  get access_token() {
    return localStorage.getItem('access_token');
  }

  get profile() {
    return this.user;
  }
}
