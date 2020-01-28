import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class AuthService {

  private headerOptions: any;

  constructor(private httpService: HttpClient, private sessionManager: SessionManagerService) { 
    this.headerOptions = new HttpHeaders({ 'content-type': 'application/json' });
  }

  registerUser(payload) {
    return this.httpService.post(environment.AUTH_URL + '/register', payload, { headers: this.headerOptions});
  } 

  loginUser(payload) {
    return this.httpService.post(environment.AUTH_URL + '/login', payload, { headers: this.headerOptions});
  }

  logout() {
      this.sessionManager.clearSession();
  }
}
