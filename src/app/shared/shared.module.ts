import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerBoxComponent } from './components/container-box/container-box.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContentHolderComponent } from './components/content-holder/content-holder.component';
import { SnackerWorker } from './helper/snacker-worker';
import { CustomTitleCasePipe } from './pipes/custom-title-case.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [ContainerBoxComponent, ContentHolderComponent, CustomTitleCasePipe, ClickOutsideDirective],
  imports: [
    CommonModule,
    MatSnackBarModule
  ], exports: [ ContainerBoxComponent, ContentHolderComponent, CustomTitleCasePipe, ClickOutsideDirective],
  providers: [SnackerWorker]
})
export class SharedModule { 
}
