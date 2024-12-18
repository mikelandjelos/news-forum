import { Seconds } from '../models/global.types';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { TooltipModule } from 'primeng/tooltip';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { SignInActions } from '../state/auth/sign-in/sign-in.actions';

const Error = {
  username: {
    pattern: 'Username should not contain any special characters',
  },
  password: {
    pattern:
      'Password must contain a minimum of 6 characters, atleast 1 alphanumeric and special character',
  },
};

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ToastrModule,
    InputTextModule,
    TooltipModule,
    AutoFocusModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [AuthService],
})
export class SignInComponent implements OnInit, OnDestroy {
  errMsg: string[] = [];

  signInForm!: FormGroup;

  onDestroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    if (this.authService.getAuthToken()) {
      this.toastr.success(`Welcome back!`);
      this.router.navigate(['/moderator-hub', 'profile-page']);
    }
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  buildForm() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.signInForm.valid) {
      this.errMsg = [];

      if (!this.signInForm.get('username')?.valid) {
        this.errMsg.push(Error.username.pattern);
      }

      if (!this.signInForm.get('password')?.valid) {
        this.errMsg.push(Error.password.pattern);
      }
    } else {
      this.errMsg = [];
      const { username, password } = this.signInForm.value;

      this.signInForm.reset();

      const tokenExpirationTime: Seconds = 24 * 60 * 60; // 1 day in seconds.

      this.store.dispatch(
        SignInActions.signIn({
          username,
          password,
          expiresIn: tokenExpirationTime,
        })
      );
    }
  }
}
