import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { HospitalService } from './services/hospital/hospital.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TableComponent } from './components/table/table.component';
// import { LinkedInSdkModule } from 'angular-linkedin-sdk';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  entryComponents: [],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
    // LinkedInSdkModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    HospitalService,

    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
