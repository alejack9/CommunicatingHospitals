import { Injectable } from '@angular/core';
import { AuthOptions, WebAuth } from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected _auth0Client: WebAuth;
  private _accessToken: string;
  private _idToken: string;
  private _properties: AuthOptions;

  constructor() {
    this._properties = {
      clientID: environment.AUTH0_CLIENTID,
      domain: environment.AUTH0_DOMAIN,
      responseType: 'token id_token',
      audience: 'http://localhost:3000',
      redirectUrl: 'http://localhost:8100/callback',
      scope: 'openid profile'
    };
    this._auth0Client = new WebAuth({ ...this._properties });
  }

  public login(): void {
    this._auth0Client.authorize();
  }

  public checkSession(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._auth0Client.checkSession(this._properties, async (err, res) => {
        if (err && err.error !== 'login_required') {
          return reject(err);
        } else if (err) {
          this.handleAuthentication();
          return resolve(false);
        }
        if (!this.isAuthenticated()) {
          this._setSession(res);
          return resolve(true);
        }
      });
    });
  }
  private _setSession(res): void {
    this._accessToken = res.accessToken;
    this._idToken = res.idToken;
  }

  public isAuthenticated(): boolean {
    return this._accessToken != null;
  }
  private handleAuthentication(): void {
    this._auth0Client.parseHash((err, res) => {
      if (res && res.accessToken && res.idToken) {
        window.location.hash = '';
        this._setSession(res);
      } else if (err) {
        console.log(err);
      }
    });
  }

  public getProfile(): Object {
    if (this._idToken) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this._idToken);
    }
  }

  public getAccessToken(): string {
    return this._accessToken;
  }

  public logout(): void {
    delete this._accessToken;
    delete this._idToken;
  }
}
