import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionManagerService } from 'src/app/utils/session-manager.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private sessionManager: SessionManagerService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.sessionManager.isSessionAvailable())
          return true;
          
        this.router.navigateByUrl('/pages')
        return false;
      }
    
}