import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RankPage } from './rank.page';
import { RankService } from 'src/app/services/rank/rank.service';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule],
  entryComponents: [RankPage],
  declarations: [RankPage],
  providers: [RankService]
})
export class RankPageModule {}
