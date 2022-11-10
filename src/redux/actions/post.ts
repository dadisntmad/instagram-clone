import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setPosts, setUserFollowingPosts } from '../slices/post';

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
              comments: doc.data().comments,
              likes: doc.data().likes,
              isLiked: doc.data().isLiked,
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
        .onSnapshot((snapshot) => {
          thunkAPI.dispatch(
            setPosts(
              snapshot.docs.map((doc) => ({
                uid: doc.data().uid,
                username: doc.data().username,
                profileImage: doc.data().profileImage,
                postUrl: doc.data().postUrl,
                postId: doc.data().postId,
                comments: doc.data().comments,
                likes: doc.data().likes,
                isLiked: doc.data().isLiked,
                description: doc.data().description,
                datePublished: doc.data().datePublished,
              })),
            ),
          );
        });
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchUserFollowingPosts = createAsyncThunk(
  'post/fetchUserFollowingPosts',
  async (uid: string, thunkAPI) => {
    try {
      db.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          const posts = doc
            .data()
            ?.followingPosts.sort(
              (dateA: { datePublished: number }, dateB: { datePublished: number }) =>
                dateB.datePublished - dateA.datePublished,
            );

          thunkAPI.dispatch(setUserFollowingPosts(posts));
        });
    } catch (error) {
      console.log(error);
    }
  },
);
