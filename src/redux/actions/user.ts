import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setSearchingUsers, setUser, setUsers } from '../slices/user';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (user: string, thunkAPI) => {
  try {
    db.collection('users')
      .where('uid', 'not-in', ['following', user])
      .onSnapshot((snapshot) => {
        thunkAPI.dispatch(
          setUsers(
            snapshot.docs.map((doc) => ({
              uid: doc.id,
              email: doc.data()?.email,
              fullName: doc.data()?.fullName,
              username: doc.data()?.username,
              imageUrl: doc.data()?.imageUrl,
              isFollowing: doc.data()?.isFollowing,
              followers: doc.data()?.followers,
              following: doc.data()?.following,
            })),
          ),
        );
      });
  } catch (error) {
    console.log(error);
  }
});

export const fetchSearchingUsers = createAsyncThunk(
  'user/fetchSearchingUsers',
  async (searchValue: string, thunkAPI) => {
    try {
      db.collection('users')
        .where('username', '>=', searchValue.toLowerCase())
        .get()
        .then((querySnapshot) => {
          thunkAPI.dispatch(
            setSearchingUsers(
              querySnapshot.docs.map((doc) => ({
                uid: doc.id,
                email: doc.data()?.email,
                fullName: doc.data()?.fullName,
                username: doc.data()?.username,
                imageUrl: doc.data()?.imageUrl,
                isFollowing: doc.data().isFollowing,
                followers: doc.data()?.followers,
                following: doc.data()?.following,
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

export const fetchUser = createAsyncThunk('user/fetchUser', async (uid: string, thunkAPI) => {
  try {
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          thunkAPI.dispatch(
            setUser({
              uid: doc.id,
              email: doc.data()?.email,
              fullName: doc.data()?.fullName,
              username: doc.data()?.username,
              imageUrl: doc.data()?.imageUrl,
              isFollowing: doc.data()?.isFollowing,
              followers: doc.data()?.followers,
              following: doc.data()?.following,
            }),
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
});
