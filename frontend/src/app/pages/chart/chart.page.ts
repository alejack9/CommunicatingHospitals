import { Component, OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss']
})
export class ChartPage implements OnInit {
  ngOnInit() {}
}
