export type UserSliceState = {
  user: User;
  users: User[];
};

export type User = {
  uid: string | undefined;
  email: string;
  fullName: string;
  username: string;
  imageUrl: string;
  bio: string;
  following: Follow[];
  followers: Follow[];
};

type Follow = {
  following: User[];
  followers: User[];
};
