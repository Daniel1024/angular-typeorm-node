import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { FormBuilder } from '@angular/forms';
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
    username: [''],
    password: ['']
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onLogin(): void {
    const formValue = this.loginForm.value;
    this.subs[0] = this.auth.login(formValue)
      .subscribe((res) => res ? this.router.navigate(['home']) : '');
  }

}
