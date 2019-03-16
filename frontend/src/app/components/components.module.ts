import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule, CommonModule, CommonModule],
  exports: [HeaderComponent]
})
export class ComponentsModule {}
