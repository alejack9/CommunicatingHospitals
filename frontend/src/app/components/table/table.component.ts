import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor() {}
  // data;

  // // tslint:disable-next-line:no-input-rename
  // @Input('preparations') preparations: Preparation[];

  // tslint:disable-next-line:no-input-rename
  @Input('first-column-title') firstColumnTitle: string;

  // tslint:disable-next-line:no-input-rename
  @Input('second-column-title') secondColumnTitle: string;

  // tslint:disable-next-line:no-input-rename
  @Input('first-column-data') firstColumnData: string[];

  // tslint:disable-next-line:no-input-rename
  @Input('second-column-data') secondColumnData: string[];

  async ngOnInit() {
    //   if (this.preparations) {
    //     await this.getPreprations();
    //   }
  }
  // /**
  //  *
  //  * @param changes
  //  */
  // async ngOnChanges(changes: SimpleChanges) {
  // if (this.preparations) {
  //   await this.getPreprations();
  // }
  // }
  // /**
  //  *
  //  */
  // async getPreprations() {
  //   this.data = this.preparations.map(p => {
  //     return {
  //       date: `${new Date(p.date).getDate()}/${new Date(p.date).getMonth() +
  //         1}/${new Date(p.date).getFullYear()}`,
  //       numberOfPreparations: p.numberOfPreparations
  //     };
  //   });
}
