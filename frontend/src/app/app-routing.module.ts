import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [LoggedGuard]
  },
  {
    path: 'callback',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'chart',
    loadChildren: './pages/chart/chart.module#ChartPageModule',
    canActivate: [LoggedGuard]
  },
  {
    path: 'tab2/:id',
    redirectTo: 'chart',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
