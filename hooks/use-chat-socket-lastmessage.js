import { useSocket } from "@/components/Providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatSocketLastMessage = ({ addKey, queryKey, userProfile }) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }
    // watch for new messages
    socket.on(addKey, (message) => {
      console.log(message, "message in last message socket");
      if (message.user.id !== userProfile.id) {
        queryClient.setQueryData([queryKey], (oldData) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              page: [
                {
                  items: [message],
                },
              ],
            };
          }

          const newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            items: [message, ...newData[0].items],
          };

          return {
            ...oldData,
            pages: newData,
          };
        });
      } else {
        return null;
      }
    });

    return () => {
      socket.off(addKey);
      //   socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, userProfile]);
};
