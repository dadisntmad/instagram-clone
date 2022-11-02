import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSliceState } from '../../types/user';

const initialState: UserSliceState = {
  user: {} as User,
  users: [],
  searchingUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSearchingUsers(state, action: PayloadAction<User[]>) {
      state.searchingUsers = action.payload;
    },
  },
});

export const { setUser, setUsers, setSearchingUsers } = userSlice.actions;

export default userSlice.reducer;
