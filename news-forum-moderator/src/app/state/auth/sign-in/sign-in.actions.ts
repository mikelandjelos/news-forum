import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Seconds } from '../../../models/global.types';

export const SignInActions = createActionGroup({
  source: 'Sign In',
  events: {
    'Sign In': props<{
      username: string;
      password: string;
      expiresIn: Seconds;
    }>(),
    'Sign In Success': props<{ accessToken: string; expiresIn: Seconds }>(),
    'Sign In Failure': props<{ error: string }>(),
  },
});
