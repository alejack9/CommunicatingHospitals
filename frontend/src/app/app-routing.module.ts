import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
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
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    canActivate: [NotLoggedGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
