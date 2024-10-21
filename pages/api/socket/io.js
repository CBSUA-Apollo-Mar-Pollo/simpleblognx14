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

    // Initialize the socket.io server
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    setupSocketEvents(io);

    // Save the instance of the socket server
    res.socket.server.io = io;
  }

  // Respond to the request
  res.end();
};

export default ioHandler;
