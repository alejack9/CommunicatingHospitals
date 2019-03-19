import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: Tab2Page },
      {
        path: 'char',
        loadChildren: '../chart/chart.module#ChartPageModule'
      }
    ])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
