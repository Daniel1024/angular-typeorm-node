import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private subs: Subscription[] = [];
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  get username(): AbstractControl {
    return this.loginForm.get('name');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onLogin(): void {
    const formValue = this.loginForm.value;
    this.subs[0] = this.auth.login(formValue)
      .subscribe((res) => res ? this.router.navigate(['home']) : '');
  }

  isValidField(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? (field.touched || field.dirty) && field.invalid : false;
  }

  getErrorMessage(error: string): string {
    let message = '';
    if (error === 'required') {
      message = 'You must enter a value';
    } else if (error === 'email') {
      message = 'Not a valid email';
    } else if (error === 'minLength') {
      message = 'This field must be longer than 5 characters';
    }
    return message;
  }

}
