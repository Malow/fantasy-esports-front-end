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
  errorCode: string;

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
        this.accountService.storeSessionKey(data['sessionKey']);
      }, (error) => {
        this.loginFailed = true;

        this.registrationFailed = false;
      });
  }

  onRegister() {
    this.accountService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value, this.registerForm.controls.displayName.value)
      .subscribe((data) => {
      this.accountService.storeSessionKey(data['sessionKey']);
    }, (error) => {
      this.loginFailed = false;
      this.registrationFailed = true;

      if (error && error.error && error.error.message && error.error.message.code) {
        this.errorCode = error.error.message.code;
      }
    });
  }
}
