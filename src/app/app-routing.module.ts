import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './shared/helper/login-guard';

const routes: Routes = [{
  path: 'auth',
  loadChildren: './modules/auth/auth.module#AuthModule',
  canActivate: [LoginGuard]
}, {
  path: 'pages',
  loadChildren: './modules/pages/pages.module#PagesModule'
},{
  path: '',
  redirectTo: 'pages', 
  pathMatch: 'full' 
}, {
  path: '**',
  redirectTo: 'pages' 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
