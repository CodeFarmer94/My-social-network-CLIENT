import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
    },
    userSettings: {
    },
    userPosts: [],}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserSettings: (state, action) => {
            state.userSettings = action.payload;
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload;
        },
    }
})

export const { setUser } = userSlice.actions;
export const { setUserSettings } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserSettings = (state) => state.user.userSettings;

export default userSlice.reducer;