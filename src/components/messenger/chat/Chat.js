import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./chat.css";
import SendMessage from "./SendMessage";
import IsLoading from "../../isLoading/IsLoading";
import { selectMyUser } from "../../../features/myUserSlice";
import { removeChat } from "../../../features/messengerSlice";
import { CloseButton } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { selectConnectedUsers } from "../../../features/messengerSlice";
import { addChatData } from "../../../features/messengerSlice";
import { extractTime } from "../../../helpers";
import { selectChatsData } from "../../../features/messengerSlice";
import { selectWebSocketMessages, setWebSocketMessages, selectReceivedWebSocketMessages } from "../../../features/messengerSlice";
function Chat({ chat }) {

  // Props
  const { recipient } = chat;
  console.log(recipient)

  // Redux State
  const dispatch = useDispatch();
  const myUser = useSelector(selectMyUser);
  const recipientFullName = recipient.firstName + " " + recipient.lastName;
  const recipientAvatar = recipient.avatarPublicId;
  const connectedUsers = useSelector(selectConnectedUsers);
  const isRecipientOnline = connectedUsers.includes(recipient.id.toString());
  const chatsStoreData = useSelector(selectChatsData)
  const webSocketMessages = useSelector(selectWebSocketMessages)
  const receivedWebSocketMessages = useSelector(selectReceivedWebSocketMessages)

  // Local State
   const [ chatId, setChatId ] = useState(null)

  // Send many messages mutation
  const sendManyMessages = async () => {
    try{
        const res = await fetch(`http://localhost:8030/message/many`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: webSocketMessages,
                chatId: chat.id
            })
        })
        const data = await res.json();
        return data
    } catch(error) {
        console.log(error.message);
    }
  }
  const { mutate: sendManyMessagesMutation } = useMutation(sendManyMessages)

  // Upload database before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendManyMessagesMutation();
      dispatch(setWebSocketMessages([]));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
        console.log('messages sent to db')
        window.removeEventListener('beforeunload', handleBeforeUnload);
        sendManyMessagesMutation()
        dispatch(setWebSocketMessages([]))
    }
  }, [])


  // Get the chat messages
  const getChat = async () => {
    try{
        console.log(recipient.id)
        const res = await fetch(`http://localhost:8030/chat/${recipient.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data)
        return data
    } catch(error) {
        console.log(error.message);
    }
  }
  const { data: chatData, isLoading } = useQuery(['chat', recipient.id], getChat, {
    // Only fetch the chat if the recipient is not null and there are no websocket added messages
  
    onSuccess: (data) => {
      dispatch(addChatData(data));
      setChatId(data.id);
    },
  });
  
    
  
  
  // Close Chat
  const closeChat = () => { 
    dispatch(removeChat(chat));
  };
  
  // Create a ref for the chat body
  const chatBodyRef = useRef(null);

  // Function to scroll chat body to bottom
  const scrollChatToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [chatId, webSocketMessages, chatsStoreData[chatId]]); 

  
  if(isLoading ||  !chatsStoreData[chatId]) {
    return(
      <IsLoading />
    )
  }
  
  const concatMessages = [...chatsStoreData[chatId], ...receivedWebSocketMessages]
  const sortedMessages = concatMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  console.log(chatId)
  return (
    <div className="chat-window">
      <div className="chat-header">
        <Image id="sl-profile-pic" cloudName="dnq3ef4tj" publicId={recipientAvatar} />
        <h6>{recipientFullName} 
        <p>
          <span className={`dot ${isRecipientOnline ? 'green' : 'red'}`}></span>
          {isRecipientOnline ? 'Online' : 'Offline'}</p>
        </h6>
        <CloseButton onClick={closeChat}/>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
          {sortedMessages.map((messageContent, index) => {
           const isAuthor = messageContent.author.id === myUser.id;
            return (
              <div
                className="message"
                key={index} 
              >
                  <div className={`message-content ${isAuthor ? 'author' : 'recipient'}`}>
                    <p >{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p className={`msg-time ${isAuthor ? 'meta-author' : ""}`}>{extractTime(messageContent.createdAt)}</p>
                  </div>

              </div>
            );
          })}
     
      </div>
      <SendMessage
      
        recipient={recipient} 
        chat = {chatData}
        chatId={chatId}
         isRecipientOnline={isRecipientOnline}/>
    </div>
  );
}

export default Chat;