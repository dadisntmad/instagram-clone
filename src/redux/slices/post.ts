import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
