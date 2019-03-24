import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { ChartPage } from '../chart/chart.page';
import { ModalController } from '@ionic/angular';
import { RankPage } from '../rank/rank.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  types;

  selectedString: string;

  constructor(
    private preprationService: PreparationService,
    private modal: ModalController
  ) {}

  async ngOnInit() {
    this.types = await this.preprationService.getPreparationTypes();
  }
  /**
   * when you select an item with the preparation it creates a page that allows you to see the various statistics
   * @param type type of prepration selected
   */
  async onSelect(type: string) {
    const modal = await this.modal.create({
      component: ChartPage,
      componentProps: { value: type }
    });
    return await modal.present();
  }

  async showRank(type: string) {
    const modal = await this.modal.create({
      component: RankPage,
      componentProps: { value: type }
    });
    return await modal.present();
  }
}
