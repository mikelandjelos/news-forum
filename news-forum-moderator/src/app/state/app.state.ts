import { AuthState } from './auth/auth.state';
import { SignUpState } from './sign-up/sign-up.state';
import { ModeratorState } from './moderator/moderator.state';

export interface AppState {
  signUp: SignUpState;
  auth: AuthState;
  moderator: ModeratorState;
}
