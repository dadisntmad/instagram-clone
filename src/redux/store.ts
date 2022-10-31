import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './slices/auth';
import userSlice from './slices/user';
import postSlice from './slices/post';
import commentSlice from './slices/comment';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
