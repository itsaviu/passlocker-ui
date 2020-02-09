import { Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output("appClickOutside") appClickOutside = new EventEmitter<MouseEvent>(); 
 
  constructor(private elementRef: ElementRef) {}
 
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
 
      if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
         this.appClickOutside.emit(event);
      }
  }

}
