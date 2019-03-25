import { AlertController, Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  previousStatus;

  constructor(public network: Network, public eventCtrl: Events) {
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.eventCtrl.publish('network:offline');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        this.eventCtrl.publish('network:online');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }
}
