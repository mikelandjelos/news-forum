import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModeratorService } from '../services/moderator.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    RouterLink,
    ToastrModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [ModeratorService],
})
export class SignInComponent implements OnInit, OnDestroy {
  errMsg: string[] = [];

  loginForm!: FormGroup;

  onDestroy$ = new Subject<void>();

  constructor(
    private moderatorService: ModeratorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errMsg = [];

      if (!this.loginForm.get('username')?.valid) {
        this.errMsg.push(Error.username.pattern);
      }

      if (!this.loginForm.get('password')?.valid) {
        this.errMsg.push(Error.password.pattern);
      }
    } else {
      this.errMsg = [];
      const { username, password } = this.loginForm.value;

      this.loginForm.reset();

      this.moderatorService
        .signIn(username, password)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          ({ exp, iat, ...moderator }) => {
            this.toastr.success(
              `Welcome ${moderator.firstName} ${moderator.lastName} (${moderator.username})!`,
              'Success'
            );
            console.log("this.router.navigate(['moderator-dashboard']);");
            // this.router.navigate(['moderator-dashboard']);
          },
          (err) => {
            const { message, error, statusCode } = err.error;
            this.toastr.error(message, 'Error');
            console.log(`Error: "${error}"; StatusCode: ${statusCode}`);
          }
        );
    }
  }
}
