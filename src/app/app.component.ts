import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private accountService: AccountService) {}

  logOut() {
    this.accountService.logOut();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }
}
