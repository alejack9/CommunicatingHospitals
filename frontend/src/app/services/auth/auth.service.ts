import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {
  InAppBrowser,
  InAppBrowserObject
} from '@ionic-native/in-app-browser/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: max-line-length
  // https://communicating-hospitals.eu.auth0.com/authorize?response_type=id_token token&client_id=hafjbtKs0JXZQYr7ctxt8SO4cF20SVf3&redirect_uri=http://localhost:8100/callback&scope=openid profile&nonce=pawm&audience=http://localhost:3000
  constructor(
    private readonly iab: InAppBrowser,
    private readonly plt: Platform,
    private readonly storage: Storage,
    private readonly toastCtrl: ToastController
  ) {
    this.helper = new JwtHelperService();
    this.plt.ready().then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Checking User Login...',
        duration: 10000
      });
      toast.present();
      const tor = await this.checkToken();
      toast.dismiss();
      return tor;
    });
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
   * allows to read the access token
   */
  get access_token() {
    return this.storage.get('access_token');
  }
  /**
   * allow to read the user profile
   */
  get profile() {
    return this.user;
  }
  /**
   *  it checks the existence of the token,
   *  if it exists the authentication is continued
   *  otherwise if the token does not exist the logout is made
   */
  private async checkToken() {
    const id_token = await this.storage.get('id_token');
    if (id_token) {
      if (!this.helper.isTokenExpired(id_token)) {
        this.user = this.helper.decodeToken(await this.storage.get('id_token'));
        this.authenticationState.next(true);
      } else {
        this.logout();
      }
    }
  }
  /**
   * allows you to log in to the application after making all the necessary checks
   */
     async login() {
    let options = [
      'location=no',
      'hidenavigationbuttons=yes',
      'hideurlbar=yes',
      'zoom=no'
    ].join(',');
    if (await this.storage.get('loggedOut')) {
      options = options.concat(
        ',',
        ['clearcache=yes', 'clearsessioncache=yes'].join(',')
      );
    }
    this.browser = this.iab.create(this.url, '_blank', options);
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        this.browser.close();
        this.setTokens(
          this.getParam(e.url, 'access_token'),
          this.getParam(e.url, 'id_token')
        ).then(() => this.authenticationState.next(true));
        this.storage.remove('loggedOut');
      }
    });
    this.browser.show();
  }
  /**
   * function that sets the token based on the parameters entered
   * @param accessToken
   * @param idToken
   */
  private async setTokens(accessToken: string, idToken: string) {
    await this.storage.set('access_token', accessToken);
    await this.storage.set('id_token', idToken);
    this.user = this.helper.decodeToken(idToken);
  }
  /**
   * allows to log out from the application
   */
  async logout() {
    await this.storage.remove('access_token');
    await this.storage.remove('id_token');
    await this.storage.set('loggedOut', true);
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
