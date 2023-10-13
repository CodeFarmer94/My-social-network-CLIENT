import { configureStore } from '@reduxjs/toolkit';
import myUserSlice from '../features/myUserSlice';
import userSlice from '../features/userSlice';
import messengerSlice from '../features/messengerSlice';
export const store = configureStore({
  reducer: {
    myUser: myUserSlice,
    user: userSlice,
    messenger: messengerSlice,
  },
});
