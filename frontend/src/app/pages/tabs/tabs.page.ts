import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private authService: AuthService, private router: Router) {}

  redirected = false;

  isReady() {
    return this.authService.isReady();
  }

  redirectIfNotAuthenticated() {
    if (!this.redirected && !this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      this.redirected = true;
    }
  }
}
