import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title') title = 'Communicating Hospitals';

  constructor(
    private readonly authService: AuthService,
    private readonly alertController: AlertController
  ) {}
  /**
   *
   */
  async presentAlert() {
    return await (await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'no'
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.logout();
          }
        }
      ]
    })).present();
  }

  async ngOnInit() {}
  /**
   *
   */
  logout() {
    return this.authService.logout();
  }
  /**
   *
   */
  getProfile() {
    return this.authService.profile;
  }
}
