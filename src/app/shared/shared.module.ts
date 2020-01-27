import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerBoxComponent } from './components/container-box/container-box.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ContentHolderComponent } from './components/content-holder/content-holder.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [ContainerBoxComponent, ContentHolderComponent, TooltipDirective],
  imports: [
    CommonModule,
    
  ], exports: [ ContainerBoxComponent, ContentHolderComponent, TooltipDirective ]
})
export class SharedModule { 
}
