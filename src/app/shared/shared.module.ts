import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerBoxComponent } from './components/container-box/container-box.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContentHolderComponent } from './components/content-holder/content-holder.component';
import { SnackerWorker } from './helper/snacker-worker';
import { CustomTitleCasePipe } from './pipes/custom-title-case.pipe';

@NgModule({
  declarations: [ContainerBoxComponent, ContentHolderComponent, CustomTitleCasePipe],
  imports: [
    CommonModule,
    MatSnackBarModule
  ], exports: [ ContainerBoxComponent, ContentHolderComponent, CustomTitleCasePipe],
  providers: [SnackerWorker]
})
export class SharedModule { 
}
