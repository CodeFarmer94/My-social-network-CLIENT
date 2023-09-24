
import socketManager from "./socketManager";
import { addChat } from "../../features/messengerSlice";
import { useDispatch } from "react-redux";
export default function OpenChat({ }) {

    const room = "1";
    const socket = socketManager.sockets[room];

  const joinRoom = () => {
      console.log('join room')
      socket.emit("join_room", room);
  };

  return (
    <div className="open-chat-btn">
        <button className="primary" onClick={joinRoom}>Open Chat</button>
     </div>
  );
}

