import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss']
})
export class ChartPage implements OnInit {
  // type: string;
  startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toISOString();
  endDate = new Date().toISOString();
  preparations;

  // "value" passed in componentProps
  @Input() value: string;

  constructor(
    // private readonly route: ActivatedRoute,
    private readonly preparationService: PreparationService,
    private modal: ModalController
  ) {}
  async ngOnInit() {
    // this.type = this.route.snapshot.paramMap.get('type');
    await this.getPreparations();
  }
  /**
   * allows closing the window with the preparation statistics
   */
  closeModal() {
    this.modal.dismiss();
  }
  /**
   * retireve of the preparations according to the parameters entered by the user
   */
  async getPreparations() {
    this.preparations = await this.preparationService.getPreprations(
      this.value,
      new Date(this.startDate),
      new Date(this.endDate)
    );
  }
  /**
   * check dates with possible changes based on the event
   * @param ev  identifies the change of date
   */
  async dateChanged(ev) {
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
    await this.getPreparations();
  }
}
