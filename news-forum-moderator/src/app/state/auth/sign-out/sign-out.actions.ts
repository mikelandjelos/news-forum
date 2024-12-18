import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SignOutActions = createActionGroup({
  source: 'Sign Out',
  events: {
    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: string }>(),
  },
});
