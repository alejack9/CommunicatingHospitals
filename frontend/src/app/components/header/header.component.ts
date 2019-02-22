import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Communicating Hospitals';

  constructor(private readonly authService: AuthService) {}

  logged = false;

  async ngOnInit() {
    await this.isAuthenticated();
  }

  async isAuthenticated() {
    this.logged = await this.authService.isLogged();
  }

  login() {
    return this.authService.login();
  }

  logout() {
    return this.authService.logout();
  }

  getProfile() {
    return this.authService.profile;
  }
}
