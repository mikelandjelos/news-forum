import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ModeratorService } from '../../services/moderator.service';
import { SignUpActions } from './sign-up.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Moderator } from '../../models/moderator.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
            console.log(error);
            return of(SignUpActions.signUpFailure({ error: error.message }))
          }
          )
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
          `Successfully signed up as ${moderator.username}! Now, please sign in with your credentials.`,
          'Success'
        );
        router.navigate(['/sign-in']);
      })
    ),
  { functional: true, dispatch: false }
);

export const signUpFailureEffect = createEffect(
  (actions$ = inject(Actions), toastrService = inject(ToastrService)) =>
    actions$.pipe(
      ofType(SignUpActions.signUpFailure),
      tap(({ error }) => {
        toastrService.error(error, 'Error');
      })
    ),
  { functional: true, dispatch: false }
);
