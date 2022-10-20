import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  posts: [],
  allPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setAllPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
});

export const { setPosts, setAllPosts } = postSlice.actions;

export default postSlice.reducer;
