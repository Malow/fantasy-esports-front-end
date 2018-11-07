import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export enum URI {
  LOGIN = '/account/login',
  REGISTER = '/account/register'
}

@Injectable()
export class AccountService extends HttpService {
  constructor(protected httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('sessionKey') ? true : false;
  }

  logIn(email: string, password: string): Observable<any> {
    return this.post(URI.LOGIN, {
      email: email,
      password: password
    });
  }

  register(email: string, password: string, displayName: string) {
    this.post(URI.REGISTER, {
      email: email,
      password: password,
      displayName: displayName
    }).subscribe((data) => {
      this.storeSessionKey(data['sessionKey']);
    });
  }

  logOut(): void {
    localStorage.removeItem('sessionKey');
  }

  storeSessionKey(sessionKey: string) {
    localStorage.setItem('sessionKey', sessionKey);
    this.router.navigate(['home']);
  }
}
