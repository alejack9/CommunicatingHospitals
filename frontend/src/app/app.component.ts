import { Network } from '@ionic-native/network/ngx';
import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';
import { Tab1Page } from '../app/pages/tab1/tab1.page';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { NetworkService } from './services/network/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    public events: Events,
    public network: Network,
    private networkProvider: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.rootPage = Tab1Page;
      Environment.setEnv({
        // api key for server
        API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDe4nQAX-jZ11waVuhK2LgTi_ECnOrhB4o',

        // api key for local development
        API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDe4nQAX-jZ11waVuhK2LgTi_ECnOrhB4o'
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(s => {
        this.router.navigate([s ? 'tabs' : 'login']);
      });

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        alert('network:offline ==> ' + this.network.type);
      });

      // Online event
      this.events.subscribe('network:online', () => {
        alert('network:online ==> ' + this.network.type);
      });
    });
  }
}
