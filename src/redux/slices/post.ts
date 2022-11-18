import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  posts: [],
  userFollowingPosts: [],
  isPostLoading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.isPostLoading = false;
    },
    setUserFollowingPosts(state, action: PayloadAction<Post[]>) {
      state.userFollowingPosts = action.payload;
      state.isPostLoading = false;
    },
    setIsPostLoading(state) {
      state.isPostLoading = true;
    },
  },
});

export const { setPosts, setUserFollowingPosts, setIsPostLoading } = postSlice.actions;

export default postSlice.reducer;
