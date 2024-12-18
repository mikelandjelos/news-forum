import { createSelector } from '@ngrx/store';
import { selectAuthProfile } from '../auth.selectors';
import { ProfileState } from './profile.state';

export const selectAuthProfileModerator = createSelector(
  selectAuthProfile,
  (state: ProfileState) => state.moderator
);
