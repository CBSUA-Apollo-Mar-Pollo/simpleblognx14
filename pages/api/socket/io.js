import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { setupSocketEvents } from "./socket-handlers";
import { dbPages } from "@/lib/db-pages";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer = res.socket.server;

    // Initialize the socket.io server
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("userLoggedIn", (data) => {
        console.log(data, "data from userLoggedIn");

        socket.broadcast.emit("userOnline", data);

        // Broadcast to other clients
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    // Save the instance of the socket server
    res.socket.server.io = io;
  }

  // Respond to the request
  res.end();
};

export default ioHandler;
