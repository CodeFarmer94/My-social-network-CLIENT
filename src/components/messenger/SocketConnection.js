import io from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectMyUser } from "../../features/myUserSlice";
import socketManager from "./socketManager";


export default function SocketConnection() {
    const myUser = useSelector(selectMyUser);
    const userId = myUser.id
    const [room, setRoom] = useState("1");
    if(!userId) return null
    socketManager.createSocketConnection(room, userId)

}
