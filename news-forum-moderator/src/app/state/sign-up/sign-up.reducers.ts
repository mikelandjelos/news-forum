import { SignUpActions } from './sign-up.actions';
import { createReducer, on } from '@ngrx/store';
import { Status } from '../app.types';
import { SignUpState } from './sign-up.state';

export const initialSignUpState: SignUpState = {
  createdModerator: null,
  error: null,
  status: null,
};

export const signUpReducer = createReducer(
  initialSignUpState,
  on(SignUpActions.signUp, (state, { moderator }) => ({
    ...state,
    status: 'pending' as Status,
  })),
  on(SignUpActions.signUpSuccess, (state, { moderator }) => ({
    ...state,
    createdModerator: moderator,
    status: 'success' as Status,
  })),
  on(SignUpActions.signUpFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'failure' as Status,
  }))
);
