export type PostSliceState = {
  posts: Post[];
  userFollowingPosts: Post[];
  isPostLoading: boolean;
};

export type Post = {
  uid: string;
  username: string;
  profileImage: string;
  postUrl: string;
  postId: string;
  likes: string[];
  comments: string[];
  isLiked: boolean;
  description: string;
  datePublished: FirestoreDate;
};

export type FirestoreDate = {
  seconds: number;
  nanoseconds: number;
};
