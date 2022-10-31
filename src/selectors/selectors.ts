import { RootState } from '../redux/store';

// auth slice
export const selectAuth = (state: RootState) => state.auth;

// user slice
export const selectUser = (state: RootState) => state.user;

// post slice
export const selectPost = (state: RootState) => state.post;

// comment slice
export const selectComment = (state: RootState) => state.comment;
