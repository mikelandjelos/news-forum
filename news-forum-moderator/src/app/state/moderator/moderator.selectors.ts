import { createSelector } from '@ngrx/store';
import { selectModerator } from '../app.selectors';
import { ModeratorState } from './moderator.state';

export const selectModeratorModerator = createSelector(
  selectModerator,
  (state: ModeratorState) => state.moderator
);

export const selectModeratorId = createSelector(
  selectModerator,
  (state: ModeratorState) => state.id
);
