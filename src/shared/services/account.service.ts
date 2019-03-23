import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

export enum URI {
  LOGIN = '/account/login',
  REGISTER = '/account/register',
  ACCOUNT = '/account',
  ACCOUNT_FIND = '/account/find'
}

export interface UserResult {
  accounts: Array<User>
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

  getUser(): Observable<User> {
    return this.get(URI.ACCOUNT);
  }

  findUser(userName: string): Observable<UserResult> {
    return this.get<UserResult>(URI.ACCOUNT_FIND, {queryParams: {displayName: userName}, uriParams: {}});
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
