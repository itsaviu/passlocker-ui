import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/utils/session-manager.service';
import { AuthService, User } from 'src/app/service/auth.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  private title = "PassLocker";
  private profile: string = "User";

  constructor(private router: Router, private sessionManager: SessionManagerService, private authService: AuthService, private snackerWorker: SnackerWorker) { 
      this.authService.getUser().subscribe((resp: User) => {
        this.profile = resp.username;
      }, (error) => {
        this.snackerWorker.openSnackBar('Something went wrong', 'X');
      })
  }

  logout() {
    this.sessionManager.clearSession();
    this.router.navigateByUrl('/auth');
  }

}
