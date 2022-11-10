export type UserSliceState = {
  user: User;
  users: User[];
  searchingUsers: User[];
};

export type User = {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  imageUrl: string;
  isFollowing: boolean;
  following: Follow[];
  followers: Follow[];
  followingPosts: [];
};

type Follow = {
  following: User[];
  followers: User[];
};
