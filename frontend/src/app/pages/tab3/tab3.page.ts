import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(
    private linkedinService: LinkedinService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    console.log(' sono in ngOn Initi');
    console.log(this.authService.profile);
    console.log(await this.linkedinService.getProfile());
  }

  pushRequest(profile) {
    // this.linkedinService.getProfile(profile);
    // console.log(this.authService.profile());
  }
}
