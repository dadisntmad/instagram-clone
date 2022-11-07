import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setComments } from '../slices/comment';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: string, thunkAPI) => {
    try {
      db.collection('posts')
        .doc(postId)
        .onSnapshot((snap) => {
          thunkAPI.dispatch(
            setComments(
              snap
                .data()
                ?.comments.sort(
                  (dateA: { datePublished: number }, dateB: { datePublished: number }) =>
                    dateB.datePublished - dateA.datePublished,
                ),
            ),
          );
        });
    } catch (error) {
      console.log(error);
    }
  },
);
