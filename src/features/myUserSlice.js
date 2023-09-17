    import {createSlice} from '@reduxjs/toolkit';

    const initialState = {
        myUser: {
            
        },
        myUserSettings: {
            
        },

        myUserPosts: [],
    };

    const myUserSlice = createSlice({
        name: 'myUser',
        initialState,
        reducers: {
            setMyUser: (state, action) => {
                state.myUser = action.payload;
            },
            setMyUserSettings: (state, action) => {
                state.myUserSettings = action.payload;
            },
            setMyUserSettingsProp: (state, action) => {
                const {prop, value} = action.payload;
                state.myUserSettings = { ...state.myUserSettings, [prop]: value}
            },
            setMyUserPosts: (state, action) => {
                const data = action.payload;
                state.myUserPosts = data;
            },
        },
    });

    export const {setMyUserSettings} = myUserSlice.actions;
    export const {setMyUserSettingsProp} = myUserSlice.actions;
    export const selectMyUserSettings = (state) => state.myUser.myUserSettings;

    export const {setMyUser} = myUserSlice.actions;
    export const selectMyUser = (state) => state.myUser.myUser;

    
    export const {setPostComments} = myUserSlice.actions;
    export const selectMyUserPosts = (state) => state.myUser.myUserPosts;
    
    export default myUserSlice.reducer;