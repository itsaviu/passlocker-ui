import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  storeSession(_tokenBody) {
    localStorage.setItem('LOCKER_TOKEN', _tokenBody.token);
    localStorage.setItem('LOCKER_SECRET', _tokenBody.hashKey);
  }

  clearSession() {
    localStorage.removeItem('LOCKER_TOKEN');
    localStorage.removeItem('LOCKER_SECRET');
  }
}
