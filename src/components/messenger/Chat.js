import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectMyUser } from "../../features/myUserSlice";
import socketManager from "./socketManager";



function Chat({  username }) {
  const myUser = useSelector(selectMyUser);
  const fullName = myUser.firstName + " " + myUser.lastName;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const room = "1";
  const socket = socketManager.sockets[room];
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: fullName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if(!socket) return 
    console.log("useEffect called");
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", receiveMessageHandler);
    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
       
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
     
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;