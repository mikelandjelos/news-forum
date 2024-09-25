import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

      this.authService
        .signIn(username, password, 60)
        .pipe(
          takeUntil(this.onDestroy$),
          tap(({ accessToken, expiresIn }) =>
            console.log(
              `SignInComponent:\n\tAccessToken: ${accessToken}\n\tExpiresIn: ${expiresIn}`
            )
          ),
          switchMap(({ accessToken, expiresIn }) =>
            this.authService.getProfile()
          )
        )
        .subscribe(
          ({ exp, iat, ...moderator }) => {
            this.toastr.success(
              `Welcome ${moderator.firstName} ${moderator.lastName} (${moderator.username})!`,
              'Success'
            );
            this.router.navigate(['moderator-hub']);
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
