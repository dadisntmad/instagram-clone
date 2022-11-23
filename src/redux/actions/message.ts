import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { setDialogs, setMessages } from '../slices/message';

export const fetchDialogs = createAsyncThunk(
  'message/fetchDialogs',
  async (uid: string, thunkAPI) => {
    try {
      db.collection('dialogs').onSnapshot((snap) => {
        thunkAPI.dispatch(
          setDialogs(
            snap.docs.map((doc) => ({
              dialogId: doc.data().dialogId,
              createdOn: doc.data().createdOn,
              sender: doc.data().sender,
              receiver: doc.data().receiver,
            })),
          ),
        );
      });
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (docId: string, thunkAPI) => {
    try {
      db.collection('dialogs')
        .doc(docId)
        .collection('messages')
        .orderBy('createdOn', 'asc')
        .onSnapshot((snap) => {
          thunkAPI.dispatch(
            setMessages(
              snap.docs.map((doc) => ({
                createdOn: doc.data().createdOn,
                receivedMessage: doc.data().receivedMessage,
                sendMessage: doc.data().sendMessage,
              })),
            ),
          );
        });
    } catch (error) {
      console.log(error);
    }
  },
);
