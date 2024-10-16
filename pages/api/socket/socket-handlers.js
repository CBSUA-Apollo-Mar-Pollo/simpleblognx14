export const setupSocketEvents = (io) => {
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
};
