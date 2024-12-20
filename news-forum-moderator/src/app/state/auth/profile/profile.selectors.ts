import { createSelector } from '@ngrx/store';
import { selectAuthProfile } from '../auth.selectors';
import { ProfileState } from './profile.state';

export const selectAuthProfileUsername = createSelector(
  selectAuthProfile,
  (state: ProfileState) => state.username
);

export const selectAuthProfileId = createSelector(
  selectAuthProfile,
  (state: ProfileState) => state.id
);
