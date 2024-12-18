import { createReducer, on } from '@ngrx/store';
import { SignOutState } from './sign-out.state';
import { SignOutActions } from './sign-out.actions';
import { Status } from '../../app.types';

export const initialSignOutState: SignOutState = {
  status: null,
  error: null,
};

export const signOutReducer = createReducer(
  initialSignOutState,
  on(SignOutActions.signOut, (state) => ({
    ...state,
    status: 'pending' as Status,
  })),
  on(SignOutActions.signOutSuccess, (state) => ({
    ...state,
    status: 'success' as Status,
  })),
  on(SignOutActions.signOutFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'failure' as Status,
  }))
);
