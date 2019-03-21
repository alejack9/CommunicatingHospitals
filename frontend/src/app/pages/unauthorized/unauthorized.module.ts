import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnauthorizedPage } from './unauthorized.page';

const routes: Routes = [
  {
    path: '',
    component: UnauthorizedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthService],
  declarations: [UnauthorizedPage]
})
export class UnauthorizedPageModule {}
