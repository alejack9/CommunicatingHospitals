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
  redirected = false;
  checked = false;
  logged = false;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {}

  // async ionViewCanEnter() {
  //   await this.isLogged();
  //   this.redirectIfLogged();
  // }

  redirectIfLogged() {
    if (this.logged && !this.redirected) {
      this.redirected = true;
      this.router.navigate(['tabs']);
    }
  }

  async isLogged() {
    this.logged = await this.authService.isLogged(); // .then(t => (this.logged = t));
  }

  async login() {
    this.authService.login();
    await this.isLogged();
    this.redirectIfLogged();
  }
}
