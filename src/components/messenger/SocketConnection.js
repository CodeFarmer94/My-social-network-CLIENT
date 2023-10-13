
import { useState } from "react";
import { useEffect } from "react";
import socketManager from "./socketManager";
import { addReceivedWebSocketMessage, addWebSocketMessage, updateConnectedUsers } from "../../features/messengerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectChatsData, addMessageToChatData } from "../../features/messengerSlice";


export default function SocketConnection({user}) {

  // Redux State
    const userId = user.id
    const socket = socketManager.createSocketConnection(userId)
    const dispatch = useDispatch();

  // Function to periodically check connected users
    function periodicallyCheckConnectedUsers() {
      socket.emit('checkConnectedUsers');
    }

    useEffect(() => {
        if (!socket) {
          console.log('Socket is not available yet');
          return;
        } 
        
        // When the user connectes it receives the connectedUsers object
        socket.on('connectedUsers', (connectedUsers) => {
          console.log('connectedUsers mounted')
          console.log(connectedUsers)
          dispatch(updateConnectedUsers(connectedUsers))
        });

        // Periodically check connected users
        const interval = 10000; 
        const intervalId = setInterval(periodicallyCheckConnectedUsers, interval);

        // When the client receives the connectedUsers object after client emits 'checkConnectedUsers'
        socket.on('checkConnectedUsers', (connectedUsers) => {
         
          dispatch(updateConnectedUsers(connectedUsers))
        });

        // When the client receives a message
        socket.on('receive_message', (message) => {
          // Handle the received message here
          dispatch(addReceivedWebSocketMessage(message))
          console.log('message received')
        });

        // Clean up the event listener when the component is unmounted
        return () => {
          socket.off('connectedUsers');
          socket.off('receive_message');
          clearInterval(intervalId);
        };
      }, [socket]);

}
