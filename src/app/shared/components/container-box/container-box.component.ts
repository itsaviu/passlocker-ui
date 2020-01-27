import { Component } from '@angular/core';

@Component({
  selector: 'app-container-box',
  template: `
  <div>
    <p class="title">
      <img src="/assets/images/lock.svg" class="title-icon"/> 
      {{title}}
    </p>
  </div>
`,
  styleUrls: ['./container-box.component.scss']
})
export class ContainerBoxComponent {
  title: string ="PassLocker";
}
