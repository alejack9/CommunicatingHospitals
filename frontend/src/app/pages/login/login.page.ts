import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {}
  /**
   *
   */
  login() {
    this.authService.login();
  }
}
