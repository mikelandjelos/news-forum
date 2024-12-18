import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Moderator } from '../../../models/moderator.model';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Check If Authenticated': emptyProps(),
    Authenticated: props<{ moderator: Moderator }>(),
    'Not Authenticated': props<{ error: string }>(),
  },
});
