import { Component, OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { ActivatedRoute } from '@angular/router';

import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private data = new Array<String>();
  preparation: Preparation[];
  private barChartLabels = new Array<String>();

  constructor(
    private preparationService: PreparationService,
    private route: ActivatedRoute
  ) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [{ data: [], label: 'Serie A' }];

  async ngOnInit() {
    await this.getPrepration();
  }

  // take numberofPrepration and date to object Preparation
  fillData(p: Preparation[]) {
    const ex = this.preparationService.extractData(p);
    ex.forEach(e => {
      this.data.push(e.numberOfPreparations.toString());
      this.barChartLabels.push(e.date.toString());
    });
  }

  async getPrepration() {
    // this.id = this.navParams.get('item');
    // this.passedId = this.route.snapshot.paramMap.get('item');
    // console.log(this.id);
    this.preparation = await this.preparationService.getPrepration(
      'Drops',
      new Date(2019, 1, 1),
      new Date(2019, 12, 31)
    );
    this.fillData(this.preparation);
    this.barChartData = [{ data: this.data, label: 'Serie A' }];
  }
}
