import { FirestoreDate } from './post';

export type CommentSliceState = {
  comments: Comment[];
};

export type Comment = {
  uid: string;
  commentId: string;
  text: string;
  profilePic: string;
  name: string;
  datePublished: FirestoreDate;
};
