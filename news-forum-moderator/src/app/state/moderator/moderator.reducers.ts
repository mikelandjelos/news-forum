import { createReducer, on } from '@ngrx/store';
import { ModeratorState } from './moderator.state';
import { ModeratorActions } from './moderator.actions';

export const initialModeratorState: ModeratorState = {
  id: null,
  moderator: null,
  updatedModerator: null,
};

export const moderatorReducer = createReducer(
  initialModeratorState,
  on(ModeratorActions.read, (state, { id }) => ({
    ...state,
    id,
  })),
  on(ModeratorActions.readSuccess, (state, { moderator }) => ({
    ...state,
    moderator,
  })),
  on(ModeratorActions.update, (state, { id, updatedModerator }) => ({
    ...state,
    updatedModerator,
  })),
  on(ModeratorActions.updateSuccess, (state, { updatedModerator }) => ({
    ...state,
    updatedModerator,
  }))
);
