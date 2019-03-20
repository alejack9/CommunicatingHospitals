import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreparationService } from 'src/app/services/preparation/preparation.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss']
})
export class ChartPage implements OnInit {
  type: string;
  startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toISOString();
  endDate = new Date().toISOString();
  preparations;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly preparationService: PreparationService
  ) {}
  async ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    await this.getPreparations();
  }

  async getPreparations() {
    this.preparations = await this.preparationService.getPreprations(
      this.type,
      new Date(this.startDate),
      new Date(this.endDate)
    );
  }

  async dateChanged(ev) {
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
    await this.getPreparations();
  }
}
