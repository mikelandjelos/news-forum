import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignInActions } from './sign-in.actions';
import { catchError, from, map, switchMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { appFailureAction } from '../../app.actions';

export const signInEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(SignInActions.signIn),
      switchMap(({ username, password, expiresIn }) =>
        authService.signIn(username, password, expiresIn).pipe(
          map(({ accessToken, expiresIn }) =>
            SignInActions.signInSuccess({ accessToken, expiresIn })
          ),
          catchError((error) => {
            return from([
              SignInActions.signInFailure({ error: error.error.message }),
              appFailureAction({
                error: error.error.message,
                source: 'Sign In',
              }),
            ]);
          })
        )
      )
    ),
  { functional: true }
);

export const signInSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    cookieService = inject(CookieService),
    router = inject(Router),
    toastrService = inject(ToastrService)
  ) =>
    actions$.pipe(
      ofType(SignInActions.signInSuccess),
      // If authentication is successfull - save the token to cookies.
      tap(({ accessToken, expiresIn }) => {
        cookieService.set(AuthService.AUTH_TOKEN_NAME, accessToken, {
          expires: expiresIn / (24 * 60 * 60), // Seconds to days (because of the CookieService API).
          path: '/',
        });
        toastrService.success('Successful sign in!', 'Success');
        router.navigate(['/moderator-hub', 'profile-page']);
      })
    ),
  { functional: true, dispatch: false }
);
