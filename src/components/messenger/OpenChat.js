

import { addChat } from "../../features/messengerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";


export default function OpenChat({ }) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);


  const handleOpenChat = () => {
   
      dispatch(addChat({ recipient: user}));
  };



  return (
    
        <button className="open-chat-btn blue-button" onClick={handleOpenChat}>Chat</button>
    
  );
}

