import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss']
})
export class ChartPage implements OnInit {
  type: string;
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
  }
}
