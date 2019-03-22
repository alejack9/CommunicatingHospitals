import { PostsMock } from '../../common/interfaces/posts-mock';
import { Component, OnInit } from '@angular/core';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [LinkedinService]
})
export class Tab3Page implements OnInit {
  HospitalsMock: PostsMock[];
  constructor(
    private linkedinService: LinkedinService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.linkedinService.getHospitalsMock();
    console.log(this.linkedinService.getHospitalsMock());
  }
  getProfile() {
    return this.authService.profile;
  }
}
