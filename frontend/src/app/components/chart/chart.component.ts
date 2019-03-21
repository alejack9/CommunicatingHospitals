import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';

import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  private data = new Array<String>();

  // tslint:disable-next-line:no-input-rename
  @Input('preparations') preparations: Preparation[];
  barChartLabels = new Array<String>();

  constructor(private preparationService: PreparationService) {}

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: '#87BFFF'
    }
  ];

  public barChartData: any[] = [{ data: [], label: 'Preparations' }];

  async ngOnInit() {
    if (this.preparations) {
      await this.getPreprations();
    }
  }
  /**
   *
   * @param changes
   */
  async ngOnChanges(changes: SimpleChanges) {
    if (this.preparations) {
      await this.getPreprations();
    }
  }
  /**
   *
   * @param p
   */
  fillData(p: Preparation[]) {
    this.data.splice(0, this.data.length);
    this.barChartLabels.splice(0, this.barChartLabels.length);
    const ex = this.preparationService.extractData(p);
    ex.forEach(e => {
      this.data.push(e.numberOfPreparations.toString());
      this.barChartLabels.push(
        `${new Date(e.date).getDate()}/${new Date(e.date).getMonth() + 1}`
      );
    });
  }
  /**
   *
   */
  async getPreprations() {
    this.fillData(this.preparations);
    this.barChartData = [{ data: this.data, label: 'Preparations' }];
  }
}
