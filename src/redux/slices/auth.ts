import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState } from '../../types/auth';

const initialState: AuthSliceState = {
  email: '',
  fullName: '',
  username: '',
  password: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setEmail, setFullName, setUsername, setPassword, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
