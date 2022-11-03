import { FirestoreDate } from './post';

export type CommentSliceState = {
  comments: Comment[];
  text: string;
};

export type Comment = {
  uid: string;
  commentId: string;
  text: string;
  profilePic: string;
  name: string;
  datePublished: FirestoreDate;
};
