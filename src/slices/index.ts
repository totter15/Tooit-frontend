import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './vote';

export const store = configureStore({
  reducer: {
    vote: voteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
