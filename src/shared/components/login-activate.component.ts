import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountService } from '../services/account.service';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.accountService.isLoggedIn) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
