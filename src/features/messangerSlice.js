import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messenger: {
        openChats: [],
    }
}

const messangerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.messenger.openChats.push(action.payload);
        }
    }
})

export const { addChat } = messangerSlice.actions;
export const selectMessenger = (state) => state.messenger.messenger;

export default messangerSlice.reducer;
