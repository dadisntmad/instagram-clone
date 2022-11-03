import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentSliceState } from '../../types/comment';

const initialState: CommentSliceState = {
  comments: [],
  text: '',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const { setComments, setText } = commentSlice.actions;

export default commentSlice.reducer;
