import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerBoxComponent } from './components/container-box/container-box.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContentHolderComponent } from './components/content-holder/content-holder.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { SnackerWorker } from './helper/snacker-worker';
import { AuthGuard } from './helper/auth-guard';

@NgModule({
  declarations: [ContainerBoxComponent, ContentHolderComponent, TooltipDirective],
  imports: [
    CommonModule,
    MatSnackBarModule
  ], exports: [ ContainerBoxComponent, ContentHolderComponent, TooltipDirective ],
  providers: [SnackerWorker]
})
export class SharedModule { 
}