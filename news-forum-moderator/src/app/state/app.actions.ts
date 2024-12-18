import { createAction, props } from '@ngrx/store';

export const appFailureAction = createAction(
  '[App] App Failure',
  props<{ error: string, source: string }>()
);
