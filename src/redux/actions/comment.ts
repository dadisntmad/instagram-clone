import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setComments } from '../slices/comment';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: string, thunkAPI) => {
    try {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .get()
        .then((querySnapshot) => {
          thunkAPI.dispatch(
            setComments(
              querySnapshot.docs.map((doc) => ({
                uid: doc.id,
                commentId: doc.id,
                text: doc.data().text,
                profilePic: doc.data().profilePic,
                name: doc.data().name,
                datePublished: doc.data().datePublished,
              })),
            ),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  },
);
