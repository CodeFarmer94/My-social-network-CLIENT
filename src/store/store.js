import { configureStore } from '@reduxjs/toolkit';
import myUserSlice from '../features/myUserSlice';
import userSlice from '../features/userSlice';
import messangerSlice from '../features/messangerSlice';
export const store = configureStore({
  reducer: {
    myUser: myUserSlice,
    user: userSlice,
    messenger: messangerSlice,
  },
});
