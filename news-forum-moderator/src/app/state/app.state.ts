import { signUpReducer } from './sign-up/sign-up.reducers';
import { SignUpState } from './sign-up/sign-up.state';

export interface AppState {
  signUp: SignUpState;
}

export const appState = {
  signUp: signUpReducer,
};
