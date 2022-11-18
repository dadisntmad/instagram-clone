import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSliceState } from '../../types/user';

const initialState: UserSliceState = {
  user: {} as User,
  users: [],
  searchingUsers: [],
  isUserLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isUserLoading = false;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSearchingUsers(state, action: PayloadAction<User[]>) {
      state.searchingUsers = action.payload;
    },
    setIsUserLoading(state) {
      state.isUserLoading = true;
    },
  },
});

export const { setUser, setUsers, setSearchingUsers, setIsUserLoading } = userSlice.actions;

export default userSlice.reducer;
