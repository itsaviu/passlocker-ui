import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AuthService } from './service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpsInterceptor } from './utils/httpinterceptor';
import { ManagerService } from './service/manager.service';
import { CustomTitleCasePipe } from './shared/pipes/custom-title-case.pipe';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,   
    TooltipModule.forRoot(), 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthService, ManagerService, {provide: HTTP_INTERCEPTORS, useClass: CustomHttpsInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
