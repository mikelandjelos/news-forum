import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { appFailureAction } from '../../app.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileActions } from './profile.actions';
import { HttpStatusCode } from '@angular/common/http';
import { ModeratorActions } from '../../moderator/moderator.actions';

export const checkIfAuthenticatedEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(ProfileActions.checkIfAuthenticated),
      switchMap((_) =>
        authService.getProfile().pipe(
          map(({ id, username, ..._ }) =>
            ProfileActions.authenticated({ id, username })
          ),
          catchError((error) => {
            if (error.status == HttpStatusCode.Unauthorized) {
              router.navigate(['/sign-in']);
            }
            return from([
              ProfileActions.notAuthenticated({ error: error.error.message }),
              appFailureAction({
                error: error.error.message,
                source: 'Check if Authenticated',
              }),
            ]);
          })
        )
      )
    ),
  { functional: true }
);

export const authenticatedEffect = createEffect(
  (
    actions$ = inject(Actions),
    toastrService = inject(ToastrService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(ProfileActions.authenticated),
      tap(({ id, username }) => {
        toastrService.info(
          `Nice to see you again ${username}!`,
          'Welcome back!'
        );
        router.navigate(['/moderator-hub', 'profile-page']);
      }),
      map(({ id, username }) => ModeratorActions.read({ id }))
    ),
  { functional: true }
);
