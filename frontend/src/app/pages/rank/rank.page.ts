import { __await } from 'tslib';
import { Period } from './../tab1/map.service';
import { ModalController } from '@ionic/angular';
import { RankService } from './../../services/rank/rank.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss']
})
export class RankPage implements OnInit {
  rows = new Array<string[]>();
  data = Array<{ ranking: number; name: string; media: number }>();
  period: Period | 'day' = 'month';
  readonly titles = ['Rank', 'Hospital', 'Avg'];
  myRank;
  // "value" passed in componentProps
  @Input() value: string;

  constructor(
    private readonly rankService: RankService,
    private modal: ModalController
  ) {}

  closeModal() {
    this.modal.dismiss();
  }

  async ngOnInit() {
    await this.getRank();
    await this.getMyRank();
  }

  async getRank() {
    this.data = await this.rankService.getRank(this.value, this.period);

    this.rows = new Array<string[]>();
    this.data.forEach(r => {
      this.rows.push([
        (r.ranking + 1).toString(),
        r.name,
        (Math.round(r.media * 100) / 100).toString()
      ]);
    });
  }
  async getMyRank() {
    this.myRank =
      (await this.rankService.getMyRank(this.value, this.period))[0].ranking +
      1;
  }

  async segmentChanged(e) {
    this.period = e.detail.value;
    await this.getRank();
    await this.getMyRank();
  }
}
