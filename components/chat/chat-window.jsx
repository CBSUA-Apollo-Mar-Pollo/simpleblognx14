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
import { getConversationInfoForChatWindow } from "@/actions/getConversationInfoForChatWindow";
import ChatWindowMessages from "./chat-window-messages";

const ChatWindow = () => {
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
        {minimizedChats.map((user) => (
          <Button
            onMouseEnter={() => handleMouseEnter(user.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onMinimizeOpen(user.id)}
            variant="ghost"
            className="mb-1 relative h-14 w-14"
          >
            {handleMouseHoverData === user.id && (
              <Button
                onClick={() => onClose(user.id)}
                size="icon"
                variant="ghost"
                className="absolute top-0 right-0 z-50 bg-neutral-800 h-6 w-6 rounded-full hover:bg-neutral-600"
              >
                <X className="text-neutral-100 h-10 w-10 m-1" />
              </Button>
            )}
            <UserAvatar
              className="h-14 w-14 border border-neutral-300"
              user={{
                name: user.name || null,
                image: user.image || null,
              }}
            />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="bg-white rounded-full drop-shadow-md mb-4 h-[7vh] w-[3.5vw] text-neutral-800"
        >
          <PenSquare className="h-6 w-6" />
        </Button>
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
    <div className="max-w-[22vw] w-[22vw]  bg-neutral-100 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-t-xl">
      {/* header */}
      <div className="py-2 px-2 drop-shadow-sm bg-white rounded-t-xl border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <UserAvatar
              className="h-8 w-8 border border-neutral-300"
              user={{
                name: chat.name || null,
                image: chat.image || null,
              }}
            />
            <span className="font-semibold">{chat.name}</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5 text-blue-700 fill-blue-700" />
            </Button>
            <Button
              onClick={() => onMinimizeClose(chat.id)}
              variant="ghost"
              size="icon"
            >
              <Minus className=" text-blue-700 " />
            </Button>
            <Button
              onClick={() => onClose(chat.id)}
              variant="ghost"
              size="icon"
            >
              <X className="h-6 w-6 text-blue-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* message content */}

      <div className="flex-1 bg-white max-h-[50vh] overflow-y-auto">
        <div className="flex  h-full">
          <div className="flex-1 flex  justify-center items-end ">
            <div className="flex flex-col w-full">
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
      <div className="bg-white border-l border-r border-neutral-300 overflow-y-auto pl-2 pt-2 flex-1">
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
