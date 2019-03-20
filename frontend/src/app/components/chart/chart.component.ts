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
  preparations: Preparation[];
  barChartLabels = new Array<String>();

  // tslint:disable-next-line:no-input-rename
  @Input('type') type: string;
  // tslint:disable-next-line:no-input-rename
  @Input('startDate') startDate: Date;
  // tslint:disable-next-line:no-input-rename
  @Input('endDate') endDate: Date;

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
    await this.getPreprations();
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.getPreprations();
  }

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

  async getPreprations() {
    this.preparations = await this.preparationService.getPreprations(
      this.type,
      new Date(this.startDate),
      new Date(this.endDate)
    );
    this.fillData(this.preparations);
    this.barChartData = [{ data: this.data, label: 'Preparations' }];
  }
}
