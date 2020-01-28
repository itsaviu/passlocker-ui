import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'auth',
  loadChildren: './modules/auth/auth.module#AuthModule'
}, {
  path: 'pages',
  loadChildren: './modules/pages/pages.module#PagesModule'
},{
  path: '',
  redirectTo: 'auth', 
  pathMatch: 'full' 
}, {
  path: '**',
  redirectTo: 'auth' 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
