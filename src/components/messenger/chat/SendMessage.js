import { useSelector } from "react-redux";
import { selectMyUser } from "../../../features/myUserSlice";
import socketManager from "../socketManager";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useState } from "react";
import { addMessageToChatData, addWebSocketMessage } from "../../../features/messengerSlice";

export default function SendMessage({setWebSocketAddedMessages, recipient, chat , isRecipientOnline}) {

    // Redux State
    const myUser = useSelector(selectMyUser);
    const dispatch = useDispatch(); 
    // Props
    const recipientId = recipient.id;
    const chatId = chat.id;

    // Local State
    const [currentMessage, setCurrentMessage] = useState("");
    // Socket Connection
    const socket = socketManager.sockets[myUser.id];

    // Send Message Mutation
    const sendMessageToDb = async() => {
        try{
            const res = await fetch(`http://localhost:8030/message`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: currentMessage,
                    chatId
                })
            })
            const data = await res.json();
            if(res.ok){
              data.author = { id: myUser.id}
              dispatch(addMessageToChatData(data))
            }
            return data
        } catch(error) {
            console.log(error.message);
        }
    }
   const  { mutate: sendMessageMutation } = useMutation(sendMessageToDb, {
        onSuccess: (data) => {
          setCurrentMessage("");
        }
    })

    // Websocket send message event
    const sendMessageWebSocket = async () => {
    if (currentMessage !== "") {
      const messageData = {
         content: currentMessage, 
         authorId: myUser.id, 
         createdAt: new Date().toISOString(),
         chatId,
         targetUserId: recipientId,
         author: { id: myUser.id}

      };
      console.log('websocket sent')
      await socket.emit("send_message", messageData);
      dispatch(addWebSocketMessage(messageData))
      dispatch(addMessageToChatData(messageData))
      setCurrentMessage("");
    }
  };
   

    return (
        <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          
        />
        <button onClick={ isRecipientOnline ? sendMessageWebSocket : sendMessageMutation}>&#9658;</button>
      </div>
  )
}