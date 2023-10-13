import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        openChats: [],
        chatsData: {},
        connectedUsers: [],
        webSocketMessages: [],
        receivedWebSocketMessages: []
}

const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        addChat: (state, action) => {
            const { userId } = action.payload
            const chat = state.openChats.find((chat) => chat.userId === userId);
            if (chat) {
                return;
            }
            state.openChats.push(action.payload);
        },
        removeChat: (state, action) => {
            state.openChats = state.openChats.filter((chat) => chat.room !== action.payload.room);
        },
        updateConnectedUsers: (state, action) => {
            state.connectedUsers = Object.keys(action.payload);
        },
        addChatData: (state, action) => {
            console.log(action.payload, 'chats data')
            state.chatsData[action.payload.id] = action.payload.Messages
            
        },
        addMessageToChatData: (state, action) => { 
           
            const chatId = action.payload.chatId
            if(!state.chatsData[chatId]){
                return
            }
            state.chatsData[chatId].push(action.payload)
            console.log(state.chatsData[chatId])
           
        },
        addWebSocketMessage: (state, action) => {
            state.webSocketMessages.push(action.payload)
        },
        removeWebSocketMessage: (state, action) => {
            state.webSocketMessages = state.webSocketMessages.filter((message) => message.id !== action.payload.id)
        },
        setWebSocketMessages: (state, action) => {
            state.webSocketMessages = action.payload
        },
        addReceivedWebSocketMessage: (state, action) => {
            state.receivedWebSocketMessages.push(action.payload)
        },
        removeReceivedWebSocketMessage: (state, action) => {
            state.receivedWebSocketMessages = state.receivedWebSocketMessages.filter((message) => message.id !== action.payload.id)
        },
        setReceivedWebSocketMessages: (state, action) => {
            state.receivedWebSocketMessages = action.payload
    }
}
})

export const { addChat, removeChat,addChatData, updateConnectedUsers, addMessageToChatData,addWebSocketMessage, removeWebSocketMessage, 
    setWebSocketMessages, setReceivedWebSocketMessages, addReceivedWebSocketMessage } = messengerSlice.actions;
export const selectOpenChats = (state) => state.messenger.openChats;
export const selectChatsData = (state) => state.messenger.chatsData;
export const selectConnectedUsers = (state) => state.messenger.connectedUsers;
export const selectWebSocketMessages = (state) => state.messenger.webSocketMessages;
export const selectReceivedWebSocketMessages = (state) => state.messenger.receivedWebSocketMessages;

export default messengerSlice.reducer;
