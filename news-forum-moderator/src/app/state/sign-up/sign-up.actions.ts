import { createActionGroup, props } from '@ngrx/store';
import { Moderator } from '../../models/moderator.model';

export const SignUpActions = createActionGroup({
  source: 'Sign Up',
  events: {
    'Sign Up': props<{ moderator: Moderator }>(),
    'Sign Up Success': props<{ moderator: Moderator }>(),
    'Sign Up Failure': props<{ error: string }>(),
  },
});
