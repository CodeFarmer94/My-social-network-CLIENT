import Chat from "./chat/Chat";
import "./messenger.css";
import { useSelector } from "react-redux";
import { selectOpenChats} from "../../features/messengerSlice";
export default function Messenger() {
    
    const openChats = useSelector(selectOpenChats);
    if(!openChats) return null;
  
    return (
        <div className="messanger-container">
        {openChats.map((chat, index) => (
            <Chat key={index} chat={chat} />
        ))}
        </div>
        )
}
    
    
