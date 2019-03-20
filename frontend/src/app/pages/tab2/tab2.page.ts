import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { ChartPage } from '../chart/chart.page';
import { ModalController } from '@ionic/angular';

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

  async onSelect(type: string) {
    const modal = await this.modal.create({
      component: ChartPage,
      componentProps: { value: type }
    });
    return await modal.present();
  }
}
