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
  data = Array<{ ranking: number; name: string; avg: number }>();
  period: Period | 'day' = 'month';

  // "value" passed in componentProps
  @Input() value: string;

  constructor(
    private readonly rankService: RankService,
    private modal: ModalController
  ) {}

  /**
   * allows closing the window with the preparation statistics
   */
  closeModal() {
    this.modal.dismiss();
  }

  async ngOnInit() {
    await this.getRank();
  }

  async getRank() {
    this.data = await this.rankService.getRank(this.value, this.period);
    this.rows = new Array<string[]>();
    this.data.forEach(r => {
      this.rows.push([r.ranking.toString(), r.name, r.avg.toString()]);
    });
  }

  /**
   * possibility to dynamically search hospitals and redraw the map
   * @param e
   */
  async segmentChanged(e) {
    this.period = e.detail.value;
    await this.getRank();
  }
}
