import { Component, OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor(private preparationService: PreparationService) {}
  private numberofPrepratarions = new Array<String>();
  preparation: Preparation[];
  private date = Array<String>();

  ngOnInit() {
    this.getPrepration();
  }

  // take numberofPrepration and date to object Preparation
  charData(p: Preparation[]) {
    p.forEach(e => {
      this.numberofPrepratarions.push(e.numberOfPreparations.toString());
      this.date.push(e.date.toString());
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
    console.log(this.preparation);
    this.charData(this.preparation);
    console.log(this.preparation[0].numberOfPreparations);
  }
}
