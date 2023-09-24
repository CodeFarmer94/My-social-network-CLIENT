// socketManager.js
import io from "socket.io-client";

const socketManager = {
  sockets: {},
  createSocketConnection: (room, userId) => {
    if (!socketManager.sockets[room]) {
      socketManager.sockets[room] = io.connect("http://localhost:8030", {
        transports: ["websocket"], query: { userId: userId }
      });
    }
    return socketManager.sockets[room];
  },
  closeSocketConnection: (room) => {
    if (socketManager.sockets[room]) {
      socketManager.sockets[room].disconnect();
      delete socketManager.sockets[room];
    }
  },
};

export default socketManager;
