import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setPosts } from '../slices/post';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, thunkAPI) => {
  try {
    db.collection('posts')
      .get()
      .then((querySnapshot) => {
        thunkAPI.dispatch(
          setPosts(
            querySnapshot.docs.map((doc) => ({
              uid: doc.id,
              username: doc.data().username,
              profileImage: doc.data().profileImage,
              postUrl: doc.data().postUrl,
              postId: doc.data().postId,
              likes: doc.data().likes,
              description: doc.data().description,
              datePublished: doc.data().datePublished,
            })),
          ),
        );
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async (uid: string, thunkAPI) => {
    try {
      db.collection('posts')
        .where('uid', '==', uid)
        .orderBy('datePublished', 'desc')
        .get()
        .then((querySnapshot) => {
          thunkAPI.dispatch(
            setPosts(
              querySnapshot.docs.map((doc) => ({
                uid: doc.data().uid,
                username: doc.data().username,
                profileImage: doc.data().profileImage,
                postUrl: doc.data().postUrl,
                postId: doc.data().postId,
                likes: doc.data().likes,
                description: doc.data().description,
                datePublished: doc.data().datePublished,
              })),
            ),
          );
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  },
);