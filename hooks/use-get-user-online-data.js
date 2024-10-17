import { useSocket } from "@/components/Providers/socket-provider";
import { useEffect, useState } from "react";

export const useGetUserOnlineData = () => {
  const { socket } = useSocket();
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("userOnline", (data) => {
      console.log(data, "userOnline");
    });

    return () => {
      socket.off("userOnline");
      //   socket.off(updateKey);
    };
  }, [socket]);
};
