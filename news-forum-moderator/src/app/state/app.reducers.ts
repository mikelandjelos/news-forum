import { authReducer } from './auth/auth.reducers';
import { moderatorReducer } from './moderator/moderator.reducers';
import { signUpReducer } from './sign-up/sign-up.reducers';

export const reducerMap = {
  signUp: signUpReducer,
  auth: authReducer,
  moderator: moderatorReducer,
};
