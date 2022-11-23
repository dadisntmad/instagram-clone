import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dialog, Message, MessagesSliceState } from '../../types/messages';

const initialState: MessagesSliceState = {
  dialogs: [],
  messages: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setDialogs(state, action: PayloadAction<Dialog[]>) {
      state.dialogs = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
  },
});

export const { setDialogs, setMessages } = messageSlice.actions;

export default messageSlice.reducer;
