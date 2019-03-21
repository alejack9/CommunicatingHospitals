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
  data;

  // tslint:disable-next-line:no-input-rename
  @Input('preparations') preparations: Preparation[];

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
   */
  async getPreprations() {
    this.data = this.preparations.map(p => {
      return {
        date: `${new Date(p.date).getDate()}/${new Date(p.date).getMonth() +
          1}/${new Date(p.date).getFullYear()}`,
        numberOfPreparations: p.numberOfPreparations
      };
    });
  }
}
