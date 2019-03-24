import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor() {}

  // tslint:disable-next-line:no-input-rename
  @Input('titles') titles: string[];

  // tslint:disable-next-line:no-input-rename
  @Input('rows') rows: Array<string[]>;
  async ngOnInit() {}
}
