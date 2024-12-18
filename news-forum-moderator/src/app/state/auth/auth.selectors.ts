import { createSelector } from '@ngrx/store';
import { selectAuth } from '../app.selectors';
import { AuthState } from './auth.state';

export const selectAuthProfile = createSelector(
  selectAuth,
  (state: AuthState) => state.profile
);
