import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { appFailureAction } from './app.actions';
import { tap } from 'rxjs';

import * as signUpEffects from './sign-up/sign-up.effects';
import * as signInEffects from './auth/sign-in/sign-in.effects';
import * as profileEffects from './auth/profile/profile.effects';
import * as signOutEffects from './auth/sign-out/sign-out.effects';

export const appFailureEffect = createEffect(
  (actions$ = inject(Actions), toastrService = inject(ToastrService)) =>
    actions$.pipe(
      ofType(appFailureAction),
      tap(({ error, source }) => {
        toastrService.error(error, `Error: ${source}`);
      })
    ),
  { functional: true, dispatch: false }
);

export const appEffects = [
  signUpEffects,
  signInEffects,
  profileEffects,
  signOutEffects,
  { appFailureEffect },
];
