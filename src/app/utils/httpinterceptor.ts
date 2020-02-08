
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { SessionManagerService } from './session-manager.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable()
export class CustomHttpsInterceptor implements HttpInterceptor {

    private authHeaders: HttpHeaders;

    constructor(private sessionManager: SessionManagerService, private router: Router) {
    }
   
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        req = req.clone({ headers: this.setAuthHeaders(this.sessionManager.getToken()) });
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) { 
                    console.log('Expired..');
                    this.router.navigateByUrl('/auth/login');
                    this.sessionManager.clearSession();
                }
                return throwError(error);
              }));
    
      }
    private setAuthHeaders(access_token: any, token_type = 'Bearer') {
        this.authHeaders = new HttpHeaders();
        if(access_token)
            this.authHeaders = this.authHeaders.append('Authorization', token_type + ' ' + access_token);
        this.authHeaders = this.authHeaders.append('Content-Type', 'application/json');
        return this.authHeaders;
      }
}