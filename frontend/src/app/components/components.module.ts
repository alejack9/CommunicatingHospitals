import { ChartComponent } from 'src/app/components/chart/chart.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule, AlertController } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [HeaderComponent, TableComponent, ChartComponent],
  imports: [IonicModule, CommonModule, ChartsModule],
  exports: [HeaderComponent, TableComponent, ChartComponent],
  providers: [AlertController]
})
export class ComponentsModule {}
