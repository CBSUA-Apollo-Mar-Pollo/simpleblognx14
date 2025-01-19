import { dbPages } from "@/lib/db-pages";

export const setupSocketEvents = (io) => {
  const userMap = {}; // To keep track of connected users
  const connectionCount = {};
  io.on("connection", (socket) => {
    socket.on("userLoggedIn", async (data) => {
      userMap[socket.id] = data.user.id;
      connectionCount[data.user.id] = (connectionCount[data.user.id] || 0) + 1;
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

      socket.emit("friendsOnlineStatus", modifiedResults);

      // Do something with the result
    });

    socket.on("disconnect", async () => {
      const userId = userMap[socket.id];

      if (userId) {
        connectionCount[userId] -= 1;

        if (connectionCount[userId] === 0) {
          // Update database and notify others only if this was the last connection
          await dbPages.user.update({
            where: {
              id: userId,
            },
            data: {
              onlineStatus: false,
            },
          });

          socket.broadcast.emit("userHasSignedOut", userId);
          delete connectionCount[userId]; // Clean up the connection count
        }

        delete userMap[socket.id]; // Clean up the user map
      }
    });
  });
};
