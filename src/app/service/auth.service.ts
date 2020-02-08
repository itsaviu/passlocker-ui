import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../utils/session-manager.service';
import { Observable } from 'rxjs';

export interface User {
  id: number,
  username: string,
  emailId: string,
  confirmed: boolean

}
@Injectable()
export class AuthService {

  constructor(private httpService: HttpClient, private sessionManager: SessionManagerService) { 
  }

  registerUser(payload) {
    return this.httpService.post(environment.AUTH_URL + '/register', payload);
  } 

  loginUser(payload) {
    return this.httpService.post(environment.AUTH_URL + '/login', payload);
  }

  getUser(): Observable<User> {
    return <Observable<User>> this.httpService.get(environment.AUTH_URL + '/user');
  }

  logout() {
      this.sessionManager.clearSession();
  }
}
