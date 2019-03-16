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
  private request =
    'https://' +
    environment.AUTH0_DOMAIN +
    '/authorize?response_type=id_token token&client_id=' +
    environment.AUTH0_CLIENTID +
    '&redirect_uri=' +
    environment.AUTH0_REDIRECTURL +
    '&scope=openid profile&nonce=pawm';
  private browser: InAppBrowserObject;

  constructor(private iab: InAppBrowser, private router: Router) {}

  private loggingStream = new Subject<boolean>();
  logging = false;
  private subscription = this.loggingStream.subscribe({
    complete: () => {
      this.logging = false;
    }
  });

  login() {
    this.logging = true;
    this.browser = this.iab.create(this.request, '_blank');
    this.browser.on('loadstart').subscribe(e => {
      if (e.url.indexOf(environment.AUTH0_REDIRECTURL) === 0) {
        // this.browser.removeEventListener("exit", (event) => {});
        localStorage.setItem(
          'access_token',
          e.url.substring(
            e.url.indexOf('access_token=') + 13,
            e.url.indexOf('&scope')
          )
        );
        localStorage.setItem(
          'id_token',
          e.url.substring(e.url.indexOf('id_token=') + 9, e.url.length)
        );
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


  async isLogged() {
    if (this.logging) {
      await this.loggingStream.toPromise();
    }
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
