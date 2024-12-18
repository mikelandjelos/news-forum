import { ProfileState } from './profile/profile.state';
import { SignInState } from './sign-in/sign-in.state';
import { SignOutState } from './sign-out/sign-out.state';

export interface AuthState {
  signIn: SignInState;
  profile: ProfileState;
  signOut: SignOutState;
}
