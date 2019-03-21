import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss']
})
export class UnauthorizedPage implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {}

  getProfile() {
    return this.authService.profile;
  }
}
