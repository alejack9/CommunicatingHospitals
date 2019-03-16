import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  items = ['Drops', 'Liquid', 'Supposte', 'Siringhe'];

  selectedString: string;

  constructor(private route: Router) {}

  ngOnInit() {}

  onSelect(item: string): void {
    this.route.navigate(['/tab2/' + item]);
    console.log(item);
  }
}
