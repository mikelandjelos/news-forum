import { combineReducers } from '@ngrx/store';
import { AuthState } from './auth.state';
import { signInReducer } from './sign-in/sign-in.reducers';
import { profileReducer } from './profile/profile.reducers';
import { signOutReducer } from './sign-out/sign-out.reducers';

export const authReducer = combineReducers<AuthState>({
  signIn: signInReducer,
  profile: profileReducer,
  signOut: signOutReducer,
});
