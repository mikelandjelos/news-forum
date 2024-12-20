import { ModeratorService } from '../../services/moderator.service';
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
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { SignUpActions } from '../../state/sign-up/sign-up.actions';

const Error = {
  username: { pattern: 'Username required' },
  password: { pattern: 'Password required' },
  email: { pattern: 'Invalid email provided' },
  firstName: { pattern: 'First name required' },
  lastName: { pattern: 'Last name required' },
  repeatPassword: { pattern: 'Passwords do not match' },
  age: { pattern: 'Age must be provided' },
  gender: { pattern: 'Gender must be selected' },
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    AutoFocusModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [ModeratorService],
})
export class SignUpComponent implements OnInit, OnDestroy {
  errMsg: string[] = [];
  signUpForm!: FormGroup;
  private onDestroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  buildForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      gender: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (!this.signUpForm.valid) {
      this.errMsg = [];

      const fields = [
        'firstName',
        'lastName',
        'username',
        'password',
        'repeatPassword',
        'email',
        'age',
        'gender',
      ];
      fields.forEach((field) => {
        if (!this.signUpForm.get(field)?.valid) {
          this.errMsg.push(Error[field as keyof typeof Error].pattern);
        }
      });

      if (
        this.signUpForm.get('password')?.value !==
        this.signUpForm.get('repeatPassword')?.value
      ) {
        this.errMsg.push(Error.repeatPassword.pattern);
      }
    } else {
      this.errMsg = [];
      const { repeatPassword, ...moderator } = this.signUpForm.value;

      this.store.dispatch(SignUpActions.signUp({ moderator }));
      this.signUpForm.reset();
    }
  }
}
