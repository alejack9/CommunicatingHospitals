import { Component, OnInit, Input } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';

import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private data = new Array<String>();
  preparation: Preparation[];
  barChartLabels = new Array<String>();

  // tslint:disable-next-line:no-input-rename
  @Input('type') type: string;

  constructor(private preparationService: PreparationService) {}

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [{ data: [], label: 'Preparations' }];

  async ngOnInit() {
    await this.getPrepration();
  }

  fillData(p: Preparation[]) {
    const ex = this.preparationService.extractData(p);
    ex.forEach(e => {
      this.data.push(e.numberOfPreparations.toString());
      this.barChartLabels.push(
        `${new Date(e.date).getDate()}/${new Date(e.date).getMonth() + 1}`
      );
    });
  }

  async getPrepration() {
    this.preparation = await this.preparationService.getPrepration(
      this.type,
      new Date(2019, 1, 1),
      new Date(2019, 12, 31)
    );
    this.fillData(this.preparation);
    this.barChartData = [{ data: this.data, label: 'Preparations' }];
  }
}
