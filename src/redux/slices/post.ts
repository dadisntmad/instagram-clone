import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  posts: [],
  userFollowingPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setUserFollowingPosts(state, action: PayloadAction<Post[]>) {
      state.userFollowingPosts = action.payload;
    },
  },
});

export const { setPosts, setUserFollowingPosts } = postSlice.actions;

export default postSlice.reducer;
