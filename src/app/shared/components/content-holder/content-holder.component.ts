import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthAppholder } from 'src/app/models/authappholder';

@Component({
  selector: 'app-content-holder',
  template: `
  <div *ngIf="feeder" class="content-wrapper">
    <div class="content-title">{{feeder.title}}</div>
    <div class="content-sub-header">{{feeder.subHeader}}</div>
    <div class="content">{{feeder.content}}</div>
    <button class="content-btn" [ngClass]="(feeder.isLogin)?'login-btn' : 'register-btn'" (click)="invokeInherited()">{{feeder.btnValue}}</button>
</div>`,
  styleUrls: ['./content-holder.component.scss']
})
export class ContentHolderComponent {

  @Input("feeder") feeder;

  @Output("invoker") invoker = new EventEmitter();

  invokeInherited() {
    this.invoker.emit();
  }

  constructor() {}

}
