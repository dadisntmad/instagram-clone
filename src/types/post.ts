import { User } from './user';

export type PostSliceState = {
  posts: Post[];
  allPosts: Post[];
};

export type Post = {
  uid: string;
  username: string;
  profileImage: string;
  postUrl: string;
  postId: string;
  likes: User[];
  description: string;
  datePublished?: string;
};