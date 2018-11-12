import { Component } from '@angular/core';
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/validators/password.validator';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';

const PASSWORD_REGEXP: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
const DISPLAY_NAME_REGEXP: RegExp = /^[a-zA-Z0-9]{0,20}$/;



@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginFailed = false;
  registrationFailed = false;
  registrationErrorCode: string;
  loginErrorCode: string;

  constructor(private accountService: AccountService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      staySignedIn: new FormControl(false, [Validators.required])
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]),
      confirmPassword: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required, Validators.pattern(DISPLAY_NAME_REGEXP)])
    }, {
      validators: PasswordValidation.MatchPassword
    });
  }

  onLogin() {
    this.accountService.logIn(this.loginForm.controls.email.value,
      this.loginForm.controls.password.value).subscribe((data) => {
        this.storeKeys(data);
        this.router.navigate(['home']);
      }, (error) => {
        this.loginFailed = true;
        this.registrationFailed = false;
        this.registrationErrorCode = '';

        if (error && error.error && error.error.errorCode) {
          this.loginErrorCode = error.error.errorCode;
        }
      });
  }

  onRegister() {
    this.accountService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.displayName.value)
      .subscribe((data) => {
        this.storeKeys(data);
        this.router.navigate(['home']);
    }, (error) => {
      this.loginFailed = false;
      this.registrationFailed = true;
      this.loginErrorCode = '';

      if (error && error.error && error.error.errorCode) {
        this.registrationErrorCode = error.error.errorCode;
      }
    });
  }

  private storeKeys(data) {
    this.router.navigate(['home']);
    this.accountService.storeSessionKey = data['sessionKey'];
    this.accountService.storeAccountId = data['accountId'];
  }
}
