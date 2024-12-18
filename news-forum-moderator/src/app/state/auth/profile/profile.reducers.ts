import { createReducer, on } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { Status } from '../../app.types';
import { ProfileActions } from './profile.actions';

export const initialProfileState: ProfileState = {
  moderator: null,
  status: null,
};

export const profileReducer = createReducer(
  initialProfileState,
  on(ProfileActions.checkIfAuthenticated, (state) => ({
    ...state,
    status: 'pending' as Status,
  })),
  on(ProfileActions.authenticated, (state, { moderator }) => ({
    ...state,
    moderator,
    status: 'success' as Status,
  })),
  on(ProfileActions.notAuthenticated, (state, { error }) => ({
    ...state,
    error,
    status: 'failure' as Status,
  }))
);
