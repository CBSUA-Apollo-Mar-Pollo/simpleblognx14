import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { setupSocketEvents } from "./socket-handlers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("userLoggedIn", (data) => {
        console.log(`${data.userId} is now online`);
        // Broadcast to other clients
        socket.broadcast.emit("userOnline", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
