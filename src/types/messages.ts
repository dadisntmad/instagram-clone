import { FirestoreDate } from './post';

export type MessagesSliceState = {
  dialogs: Dialog[];
  messages: Message[];
};

export type Dialog = {
  dialogId: string;
  receiver: Participant;
  sender: Participant;
  createdOn: FirestoreDate;
  participants: string[];
};

export type Message = {
  createdOn: Date;
  receivedMessage: Participant & TextMessage;
  sendMessage: Participant & TextMessage;
};

export type Participant = {
  uid: string;
  imageUrl: string;
  username: string;
};

type TextMessage = {
  message: string;
};
