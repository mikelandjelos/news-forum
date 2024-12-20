import { AppState } from './app.state';

export const selectAuth = (state: AppState) => state.auth;
export const selectSignUp = (state: AppState) => state.signUp;
export const selectModerator = (state: AppState) => state.moderator
