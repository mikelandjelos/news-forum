import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ModeratorService } from '../../services/moderator.service';
import { SignUpActions } from './sign-up.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { Moderator } from '../../models/moderator.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { appFailureAction } from '../app.actions';

export const signUpEffect = createEffect(
  (actions$ = inject(Actions), moderatorService = inject(ModeratorService)) =>
    actions$.pipe(
      ofType(SignUpActions.signUp),
      switchMap(({ moderator }) =>
        moderatorService.create(moderator).pipe(
          map((createdModerator: Moderator) =>
            SignUpActions.signUpSuccess({ moderator: createdModerator })
          ),
          catchError((error) => {
            return from([
              SignUpActions.signUpFailure({ error: error.error.message }),
              appFailureAction({
                error: error.error.message,
                source: 'Sign Up',
              }),
            ]);
          })
        )
      )
    ),
  { functional: true }
);

export const signUpSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    toastrService = inject(ToastrService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(SignUpActions.signUpSuccess),
      tap(({ moderator }) => {
        toastrService.success(
          `Successfully signed up as ${moderator.username}! ` +
            'Now, please sign in with your credentials.',
          'Success'
        );
        router.navigate(['/sign-in']);
      })
    ),
  { functional: true, dispatch: false }
);
