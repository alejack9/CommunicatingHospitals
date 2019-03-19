import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule, CommonModule, ChartsModule],
  exports: [HeaderComponent]
})
export class ComponentsModule {}
