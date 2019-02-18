import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './pages/tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'callback',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'tab2/:id',
    redirectTo: 'chart',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'tab2/:id',
    loadChildren: './pages/tab2/tab2.module#Tab2PageModule'
  },
  {
    path: 'chart',
    loadChildren: './pages/chart/chart.module#ChartPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
