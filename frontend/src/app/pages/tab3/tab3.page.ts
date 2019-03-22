import { Post } from '../../common/interfaces/post';
import { Component, OnInit } from '@angular/core';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  posts: Post[];
  constructor(private linkedinService: LinkedinService) {}

  async ngOnInit() {
    this.posts = this.linkedinService.getPosts();
    console.log(this.linkedinService.getPosts());
  }
}
