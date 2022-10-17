import { RootState } from '../redux/store';

// auth slice
export const selectAuth = (state: RootState) => state.auth;
