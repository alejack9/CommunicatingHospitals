import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  redirected = false;

  ngOnInit() {}

  login() {
    this.authService.login();
  }

  isReady() {
    return this.authService.isReady();
  }
  redirectIfAuthenticated() {
    if (!this.redirected && this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      this.redirected = true;
    }
  }
}
