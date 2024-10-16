import { useSocket } from "@/components/Providers/socket-provider";
import { useEffect } from "react";

export const useMakeUserOnline = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("userLoggedIn", { user: "example data" });

    return () => {
      socket.off(addKey);
      //   socket.off(updateKey);
    };
  }, [socket]);
};
