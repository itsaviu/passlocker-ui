import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateVaultComponent } from './components/create-vault/create-vault.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, NavbarComponent, FooterComponent, CreateVaultComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    SharedModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  entryComponents: [CreateVaultComponent]
})
export class PagesModule { }
