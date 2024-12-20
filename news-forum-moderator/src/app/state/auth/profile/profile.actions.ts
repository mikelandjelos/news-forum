import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Check If Authenticated': emptyProps(),
    Authenticated: props<{ id: string; username: string }>(),
    'Not Authenticated': props<{ error: string }>(),
  },
});
