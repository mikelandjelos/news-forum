import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignOutActions } from './sign-out.actions';
import { catchError, from, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { appFailureAction } from '../../app.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const signOutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(SignOutActions.signOut),
      switchMap((_) =>
        authService.signOut().pipe(
          map((_) => SignOutActions.signOutSuccess()),
          catchError(({ error }) =>
            from([
              SignOutActions.signOutFailure({ error: error.error.message }),
              appFailureAction({
                error: error.error.message,
                source: 'Sign Out',
              }),
            ])
          )
        )
      )
    ),
  { functional: true }
);

export const signOutSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    toastrService = inject(ToastrService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(SignOutActions.signOutSuccess),
      tap((_) => {
        toastrService.info('Successfully signed out!', 'Info');
        router.navigate(['/sign-in']);
      })
    ),
  { functional: true, dispatch: false }
);
