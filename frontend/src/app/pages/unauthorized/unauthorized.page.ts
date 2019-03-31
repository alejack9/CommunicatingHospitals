import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss']
})
export class UnauthorizedPage implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authService.authenticationState
      .pipe(filter(s => !s))
      .subscribe(() => this.router.navigate(['login']));
  }

  getProfile() {
    return this.authService.profile;
  }
}
