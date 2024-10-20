import { useSocket } from "@/components/Providers/socket-provider";
import { useEffect, useState } from "react";

export const useMakeUserOnline = ({ session }) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("userLoggedIn", session);

    socket.emit("getUserOnline", session);

    return () => {
      socket.off("userLoggedIn");
      //   socket.off(updateKey);
    };
  }, [socket]);
};
