import { Preparation } from 'src/app/common/interfaces/preparation.interface';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss']
})
export class ChartPage implements OnInit {
  rows = Array<string[]>();
  readonly titles = ['Date', 'Number of Preparations'];
  startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toISOString();
  endDate = new Date().toISOString();
  preparations: Preparation[];

  // "value" passed in componentProps
  @Input() value: string;

  constructor(
    private readonly preparationService: PreparationService,
    private modal: ModalController
  ) {}

  async ngOnInit() {
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

    this.rows = Array<string[]>();
    this.preparations.forEach(p => {
      this.rows.push([
        `${new Date(p.date).getDate()}/${new Date(p.date).getMonth() +
          1}/${new Date(p.date).getFullYear()}`,
        p.numberOfPreparations.toString()
      ]);
    });
    // this.cols.push(
    //   this.preparations.map(
    //     p =>
    //       `${new Date(p.date).getDate()}/${new Date(p.date).getMonth() +
    //         1}/${new Date(p.date).getFullYear()}`
    //   )
    // );
    // this.cols.push(
    //   this.preparations.map(p => p.numberOfPreparations.toString())
    // );
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
