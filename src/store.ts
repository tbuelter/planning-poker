import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './features/room/roomSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
