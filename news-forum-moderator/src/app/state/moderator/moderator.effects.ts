import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ModeratorActions } from './moderator.actions';
import { ModeratorService } from '../../services/moderator.service';
import { Moderator } from '../../models/moderator.model';
import { appFailureAction } from '../app.actions';
import { ToastrService } from 'ngx-toastr';

export const moderatorReadEffect = createEffect(
  (actions$ = inject(Actions), moderatorService = inject(ModeratorService)) =>
    actions$.pipe(
      ofType(ModeratorActions.read),
      switchMap(({ id }) =>
        moderatorService.readById(id).pipe(
          map((moderator: Moderator) =>
            ModeratorActions.readSuccess({ moderator })
          ),
          catchError((error) =>
            of(
              appFailureAction({
                error: error.error.message,
                source: 'Read Moderator by ID',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const moderatorUpdateEffect = createEffect(
  (actions$ = inject(Actions), moderatorService = inject(ModeratorService)) =>
    actions$.pipe(
      ofType(ModeratorActions.update),
      switchMap(({ id, updatedModerator }) =>
        moderatorService.update(id, updatedModerator).pipe(
          map((updatedModerator: Moderator) =>
            ModeratorActions.updateSuccess({ updatedModerator })
          ),
          catchError((error) =>
            of(
              appFailureAction({
                error: error.error.message,
                source: 'Update Moderator',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const moderatorUpdateSuccessEffect = createEffect(
  (actions$ = inject(Actions), toastrService = inject(ToastrService)) =>
    actions$.pipe(
      ofType(ModeratorActions.updateSuccess),
      tap(({ updatedModerator }) => {
        toastrService.success(
          'Successfully updated your profile info!',
          'Success'
        );
      }),
      map(({ updatedModerator }) =>
        ModeratorActions.read({ id: updatedModerator.id })
      )
    ),
  { functional: true }
);
