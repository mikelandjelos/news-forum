import { AuthState } from './auth/auth.state';
import { SignUpState } from './sign-up/sign-up.state';

export interface AppState {
  signUp: SignUpState;
  auth: AuthState;
}
