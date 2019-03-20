import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title') title = 'Communicating Hospitals';

  constructor(private readonly authService: AuthService) {}

  async ngOnInit() {}

  logout() {
    return this.authService.logout();
  }

  getProfile() {
    return this.authService.profile;
  }
}
