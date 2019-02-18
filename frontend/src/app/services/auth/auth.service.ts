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
  private ready: boolean;

  constructor() {
    this._properties = {
      clientID: environment.AUTH0_CLIENTID,
      domain: environment.AUTH0_DOMAIN,
      responseType: 'token id_token',
      audience: 'http://localhost:3000',
      redirectUri: 'http://localhost:8100/callback',
      scope: 'openid profile'
    };
    this._auth0Client = new WebAuth({ ...this._properties });
  }

  public login(): void {
    this.ready = false;
    // triggers auth0 authentication page
    this._auth0Client.authorize();
  }

  public checkSession(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // checks in Auth0's server if the browser has a session
      this._auth0Client.checkSession(
        this._properties,
        async (error, authResult) => {
          if (error && error.error !== 'login_required') {
            this.ready = true;
            // some other error
            return reject(error);
          } else if (error) {
            this.ready = true;
            // explicit authentication
            this.handleAuthentication();
            return resolve(false);
          }
          if (!this.isAuthenticated()) {
            this._setSession(authResult);
            this.ready = true;
            return resolve(true);
          }
        }
      );
    });
  }

  public isReady() {
    return this.ready;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return this._accessToken != null;
  }

  private handleAuthentication(): void {
    this._auth0Client.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private _setSession(authResult): void {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
  }

  // check if there is a property Admin in the access token
  public isAdmin(): boolean {
    if (this._accessToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this._accessToken);
      if (decodedToken['http://localhost:3000/roles'].indexOf('admin') > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public getProfile(): Object {
    if (this._idToken) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this._idToken);
    }
  }

  public getAccessToken(): String {
    return this._accessToken;
  }

  public logout(): void {
    // Remove tokens
    delete this._accessToken;
    delete this._idToken;
  }
}
