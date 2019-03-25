import { Network } from '@ionic-native/network/ngx';
import { Component } from '@angular/core';

import { Platform, Events, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';
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
    private networkProvider: NetworkService,
    public alertController: AlertController
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
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(s => {
        this.router.navigate([s ? 'tabs' : 'login']);
      });

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        this.alertController
          .create({
            header: 'Offline detected',
            subHeader:
              'It seems you haven\'t turned on the wireless or data connection.\n' +
              'The app will not run successfully.',
            message: 'Please turn it on'
          })
          .then(alert => alert.present());
      });

      // Online event
      this.events.subscribe('network:online', () => {
        this.alertController
          .create({
            header: 'Back Online',
            subHeader: '',
            message: 'You can continue using the app.',
            buttons: ['OK']
          })
          .then(alert => alert.present());
      });
    });
  }
}
