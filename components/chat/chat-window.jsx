"use client";

import { useChatWindowStore } from "@/hooks/use-chat-window-store";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Minus, PenSquare, Phone, X } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { useSession } from "next-auth/react";
import ChatWindowInput from "./chat-window-input";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getConversationInfoForChatWindow } from "@/data/getConversationInfoForChatWindow";
import ChatWindowMessages from "./chat-window-messages";

const ChatWindow = () => {
  const { data: session } = useSession();
  const [handleMouseHoverData, setHandleMouseHoverData] = useState(null);
  const { data, onClose, minimizedChats, onMinimizeOpen } =
    useChatWindowStore();
  const pathname = usePathname();
  // Regular expression to match paths that start with '/chatbox/'
  const excludePattern = /^\/chatbox\/.*/;

  // Check if the current pathname is in the excludePaths array
  const shouldExcludeChatWindow = excludePattern.test(pathname);

  if (shouldExcludeChatWindow) {
    return null;
  }

  const handleMouseEnter = (id) => {
    setHandleMouseHoverData(id);
  };

  const handleMouseLeave = () => {
    setHandleMouseHoverData(null);
  };

  return (
    <div className="flex items-end gap-x-5">
      <div className="flex items-end gap-x-1">
        {data.map((chat, index) => (
          <div key={index}>
            <ChatWindowBox chat={chat} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-y-1">
        {minimizedChats.map((user, index) => (
          <Button
            key={index}
            onMouseEnter={() => handleMouseEnter(user.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onMinimizeOpen(user.id)}
            variant="ghost"
            className="mb-1 relative h-14 w-14 dark:hover:bg-neutral-700 rounded-full"
          >
            {handleMouseHoverData === user.id && (
              <Button
                onClick={() => onClose(user.id)}
                size="icon"
                variant="ghost"
                className="absolute top-0 right-0 z-50 bg-neutral-800 h-6 w-6 rounded-full hover:bg-neutral-600 dark:hover:bg-neutral-700"
              >
                <X className="text-neutral-100 h-10 w-10 m-1" />
              </Button>
            )}
            <UserAvatar
              className="h-12 w-12 border border-neutral-300"
              user={{
                name: user.name || null,
                image: user.image || null,
              }}
            />
          </Button>
        ))}

        {/* {session?.user && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-white border rounded-full drop-shadow-[0px_0px_7px_rgba(0,0,0,0.2)] mb-4 h-12 w-12  text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
          >
            <PenSquare className="h-6 w-6  text-neutral-800 fill-neutral-200" />
          </Button>
        )} */}
      </div>
    </div>
  );
};

const ChatWindowBox = ({ chat }) => {
  const { onClose, onMinimizeClose } = useChatWindowStore();
  const { data: session } = useSession();

  const {
    data: conversationData,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["getInfoForChatWindow", chat.id],
    queryFn: async () => {
      const res = await getConversationInfoForChatWindow(
        chat.id,
        session.user.id
      );
      return res;
    },
  });

  const conversation = conversationData?.conversation;
  const userProfile = conversationData?.userProfile;
  const currentUser = conversationData?.currentUser;

  return (
    <div className="max-w-[21vw] w-[21vw]   drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-t-xl">
      {/* header */}
      <div className="py-2 px-2 drop-shadow-sm bg-white dark:bg-neutral-800 dark:border-0 rounded-t-xl border dark:border-b dark:border-neutral-700 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <UserAvatar
              className="h-8 w-8 border border-neutral-300"
              user={{
                name: chat.name || null,
                image: chat.image || null,
              }}
            />
            <span className="font-semibold dark:text-white">{chat.name}</span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="dark:hover:bg-neutral-700 rounded-full"
            >
              <Phone className="h-5 w-5 text-blue-700 fill-blue-700 dark:text-blue-500 dark:fill-blue-500" />
            </Button>
            <Button
              onClick={() => onMinimizeClose(chat.id)}
              variant="ghost"
              size="icon"
              className="dark:hover:bg-neutral-700 rounded-full"
            >
              <Minus className=" text-blue-700 dark:text-blue-500 " />
            </Button>
            <Button
              onClick={() => onClose(chat.id)}
              variant="ghost"
              size="icon"
              className="dark:hover:bg-neutral-700 rounded-full"
            >
              <X className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* message content */}

      <div className="flex-1 bg-white dark:bg-neutral-800 max-h-[50vh] overflow-y-auto">
        <div className="flex  h-full">
          <div className="flex-1 flex  justify-center items-end ">
            <div className="flex flex-col w-full px-2">
              <ChatWindowMessages
                currentUser={currentUser}
                userProfile={userProfile}
                chatId={conversation?.id}
                paramKey="conversationId"
                paramValue={conversation?.id}
                conversationId={conversation?.id}
                conversationDate={conversation?.createdAt}
                apiUrl="/api/direct-messages"
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="bg-white dark:bg-neutral-800 border-l border-r dark:border-l-0 dark:border-r-0  border-neutral-300 overflow-y-auto pl-2 pt-2 flex-1">
        <ChatWindowInput
          session={session}
          conversationId={conversation?.id}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
