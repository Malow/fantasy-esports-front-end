import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export enum URI {
  LOGIN = '/account/login',
  REGISTER = '/account/register',
  ACCOUNT = '/account'
}

@Injectable()
export class AccountService extends HttpService {
  constructor(protected httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('sessionKey') ? true : false;
  }

  logIn(email: string, password: string): Observable<any> {
    return this.post(URI.LOGIN, {
      email: email,
      password: password
    });
  }

  register(email: string, password: string, displayName: string): Observable<any> {
    return this.post(URI.REGISTER, {
      email: email,
      password: password,
      displayName: displayName
    });
  }

  getUser(): Observable<any> {
    return this.get(URI.ACCOUNT);
  }


  logOut(): void {
    localStorage.removeItem('sessionKey');
    localStorage.removeItem('accountId');
  }

  set storeSessionKey(sessionKey: string) {
    localStorage.setItem('sessionKey', sessionKey);
  }

  set storeAccountId(accountId: string) {
    localStorage.setItem('accountId', accountId);
  }

  get accountId(): string {
    return localStorage.getItem('accountId');
  }

  get sessionKey(): string {
    return localStorage.getItem('sessionKey');
  }
}
