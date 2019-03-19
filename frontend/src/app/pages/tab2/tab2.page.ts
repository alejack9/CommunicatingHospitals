import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { NavController } from '@ionic/angular';
import { ChartPage } from '../chart/chart.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  items;
  value = 0;

  selectedString: string;

  constructor(
    private route: Router,
    private preprationService: PreparationService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    this.items = await this.preprationService.getPreparationTypes();
  }

  onSelect(item: string): void {
    this.route.navigate(['tab2/' + item]);
    // .id = item;
    console.log(item);
  }
}
