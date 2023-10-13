// socketManager.js
import io from "socket.io-client";

const socketManager = {
  sockets: {},
  createSocketConnection: (userId) => {
    if(!userId) return console.log('User not found')
    if (!socketManager.sockets[userId]) {
      socketManager.sockets[userId] = io.connect("http://localhost:8030", {
        transports: ["websocket"], query: { userId: userId }
      });
    }
    return socketManager.sockets[userId];
  },
  closeSocketConnection: (userId) => {
    if (socketManager.sockets[userId]) {
      socketManager.sockets[userId].disconnect();
      delete socketManager.sockets[userId];
    }
  },
};

export default socketManager;
