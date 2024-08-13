import { useSocket } from "@/components/Providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatSocket = ({ addKey, updateKey, queryKey }) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  console.log(addKey);

  useEffect(() => {
    if (!socket) {
      return;
    }

    // socket.on(updateKey, (message) => {
    //   queryClient.setQueryData([queryKey], (oldData) => {
    //     if (!oldData || !oldData.pages || oldData.pages.length === 0) {
    //       return oldData;
    //     }

    //     const newData = oldData.pages.map((page) => {
    //       return {
    //         ...page,
    //         items: page.items.map((item) => {
    //           if (item.id === message.id) {
    //             return message;
    //           }
    //           return item;
    //         }),
    //       };
    //     });
    //     return {
    //       ...oldData,
    //       pages: newData,
    //     };
    //   });
    // });

    // watch for new messages
    socket.on(addKey, (message) => {
      console.log(message, "message");
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
    });

    return () => {
      socket.off(addKey);
      //   socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
