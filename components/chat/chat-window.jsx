"use client";

import { useChatWindowStore } from "@/hooks/use-chat-window-store";
import React from "react";
import { Button } from "../ui/Button";
import { Minus, PenSquare, Phone, X } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import ChatInput from "./chat-input";
import { useSession } from "next-auth/react";

const ChatWindow = () => {
  const { onOpen, data } = useChatWindowStore();
  return (
    <div className="flex items-end gap-x-5">
      <div className="flex items-end gap-x-1">
        {data.map((chat, index) => (
          <ChatWindowBox chat={chat} />
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="bg-white rounded-full drop-shadow-md mb-4 h-[7vh] w-[3.5vw] text-neutral-800"
      >
        <PenSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

const ChatWindowBox = ({ chat }) => {
  const { data: session } = useSession();
  console.log(chat, "chat");
  return (
    <div className="max-w-[20vw]  bg-neutral-100 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)] rounded-t-xl">
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
          <div className="flex items-center gap-x-2">
            <Phone className="h-5 w-5 text-blue-700 fill-blue-700" />
            <Minus className=" text-blue-700 " />
            <X className="h-6 w-6 text-blue-700" />
          </div>
        </div>
      </div>

      {/* message content */}
      <div className="bg-white border-l border-r border-neutral-300 max-h-[45vh] overflow-y-auto pl-2">
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
        <h1>sasa</h1>
      </div>

      {/* footer */}
      <div className="bg-white border-l border-r border-neutral-300 overflow-y-auto pl-2 pt-2">
        <ChatInput
          session={session}
          conversationId={"clwytc7p8000pvou85ttg2rjp"}
          userProfile={chat}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
