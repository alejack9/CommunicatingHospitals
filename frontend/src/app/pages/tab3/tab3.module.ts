import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  providers: [LinkedinService],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
