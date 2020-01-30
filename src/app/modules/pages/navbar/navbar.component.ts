import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/service/session-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  private title = "PassLocker";
  private profile: string = "User";

  constructor(private router: Router, private sessionManager: SessionManagerService) { }

  logout() {
    this.sessionManager.clearSession();
    this.router.navigateByUrl('/auth');
  }

}
