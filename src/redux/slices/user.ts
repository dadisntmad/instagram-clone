import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSliceState } from '../../types/user';

const initialState: UserSliceState = {
  user: {} as User,
  users: [],
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
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
