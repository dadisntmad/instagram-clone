import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentSliceState } from '../../types/comment';

const initialState: CommentSliceState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
