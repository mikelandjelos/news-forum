import { createReducer, on } from '@ngrx/store';
import { SignInState } from './sign-in.state';
import { Status } from '../../app.types';
import { SignInActions } from './sign-in.actions';

export const initialSignInState: SignInState = {
  error: null,
  status: null,
};

export const signInReducer = createReducer(
  initialSignInState,
  on(SignInActions.signIn, (state, { username, password, expiresIn }) => ({
    ...state,
    status: 'pending' as Status,
  })),
  on(SignInActions.signInSuccess, (state, { accessToken, expiresIn }) => ({
    ...state,
    status: 'success' as Status,
  })),
  on(SignInActions.signInFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'failure' as Status,
  }))
);
