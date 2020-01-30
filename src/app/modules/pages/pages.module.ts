import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class PagesModule { }
