import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChartPage } from './chart.page';
import { ChartsModule } from 'ng2-charts';
import { TableComponent } from 'src/app/components/table/table.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChartComponent } from 'src/app/components/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartPage, TableComponent, ChartComponent]
})
export class ChartPageModule {}
