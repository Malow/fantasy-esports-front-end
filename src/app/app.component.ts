import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: Array<string> = ['en'];
  displayName: string;

  constructor(private router: Router, private accountService: AccountService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(this.languages[0]);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.languages[0]);

    this.getDisplayName();
  }

  setLanguage(language: string) {
    this.translate.use(language);
  }

  logOut() {
    this.accountService.logOut();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn;
  }

  getDisplayName() {
    if (this.isLoggedIn()) {
      this.accountService.getUser().subscribe((data) => {
        this.displayName = data['displayName'];
      });
    }
  }
}
