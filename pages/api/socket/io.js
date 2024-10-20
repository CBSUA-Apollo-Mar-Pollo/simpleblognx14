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
      socket.on("userLoggedIn", async (data) => {
        await dbPages.user.update({
          where: {
            id: data.user.id,
          },
          data: {
            onlineStatus: true,
            lastStatusChange: new Date(),
          },
        });

        const userData = await dbPages.user.findUnique({
          where: {
            id: data.user.id,
          },
          select: {
            id: true,
            name: true,
            onlineStatus: true,
            lastStatusChange: true,
          },
        });

        socket.broadcast.emit("userOnline", userData);

        // Broadcast to other clients
      });

      socket.on("sign-out", async (data) => {
        await dbPages.user.update({
          where: {
            id: data,
          },
          data: {
            onlineStatus: false,
          },
        });
        socket.broadcast.emit("userHasSignedOut", data);
      });

      socket.on("getUserOnline", async (data) => {
        console.log("getUserOnline", data);
        const userId = data.user.id;

        const results = await dbPages.friend.findMany({
          where: {
            OR: [{ userId: userId }, { requesterUserId: userId }],
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                lastStatusChange: true,
                onlineStatus: true,
              },
            },
            requesterUser: {
              select: {
                id: true,
                name: true,
                lastStatusChange: true,
                onlineStatus: true,
              },
            },
          },
        });

        const modifiedResults = results.map((result) => {
          if (result.user.id !== userId) {
            const { requesterUser, ...rest } = result; // Remove requesterUser
            return { ...rest }; // Return the object without requesterUser
          } else {
            const { user, ...rest } = result; // Remove user
            return { ...rest }; // Return the object without user
          }
        });

        console.log(modifiedResults, "modified results");

        socket.emit("friendsOnlineStatus", modifiedResults);

        // Do something with the result
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
