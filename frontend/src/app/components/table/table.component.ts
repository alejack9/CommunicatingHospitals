import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { PreparationService } from 'src/app/services/preparation/preparation.service';
import { Preparation } from 'src/app/common/interfaces/preparation.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  constructor(private preparationService: PreparationService) {}
  preparations: Preparation[] | any;
  private date = Array<String>();

  // tslint:disable-next-line:no-input-rename
  @Input('type') type: string;
  // tslint:disable-next-line:no-input-rename
  @Input('startDate') startDate: Date;
  // tslint:disable-next-line:no-input-rename
  @Input('endDate') endDate: Date;

  async ngOnInit() {
    await this.getPreprations();
  }
  async ngOnChanges(changes: SimpleChanges) {
    await this.getPreprations();
  }
  async getPreprations() {
    this.preparations = await this.preparationService.getPreprations(
      this.type,
      new Date(this.startDate),
      new Date(this.endDate)
    );

    console.log(this.preparations);

    this.preparations = this.preparations.map(p => {
      return {
        date: `${new Date(p.date).getDate()}/${new Date(p.date).getMonth() +
          1}/${new Date(p.date).getFullYear()}`,
        numberOfPreparations: p.numberOfPreparations
      };
    });
  }
}
