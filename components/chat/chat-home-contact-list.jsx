"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { useChatWindowStore } from "@/hooks/use-chat-window-store";
import { useSocket } from "../Providers/socket-provider";
import { useMakeUserOnline } from "@/hooks/use-make-user-online";
import { useGetUserOnlineData } from "@/hooks/use-get-user-online-data";

const ChatHomeContactList = ({ conversationList, session }) => {
  const { onOpen, data } = useChatWindowStore();
  const { socket } = useSocket();
  const [userData, setUserData] = useState(null);

  useMakeUserOnline({ session });

  useEffect(() => {
    if (!socket) return;

    const handleUserOnline = (userData) => {
      console.log("User is online:", userData);
      setUserData(userData);
      // Handle the user online event (update state, etc.)
    };

    socket.on("userOnline", handleUserOnline);

    // Clean up the event listener on component unmount
    return () => {
      socket.off("userOnline", handleUserOnline);
    };
  }, [socket]);

  return (
    <div className="mt-2 mx-4">
      <div className="flex justify-between mb-2">
        <h1 className="font-semibold  dark:text-neutral-50 text-[18px] pl-2">
          Contacts
        </h1>

        <div className="flex items-center gap-x-2">
          <Search className="h-5 w-5 dark:text-neutral-50" />
          <MoreHorizontal className="dark:text-neutral-50" />
        </div>
      </div>

      <div className=" mt-2">
        {conversationList.map((user, index) => {
          // Generate a unique key for each item
          const key = user.id || index; // Prefer a unique identifier from user if available

          if (user.userOne) {
            return (
              <div
                onClick={() => onOpen("directMessage", [user.userOne])}
                key={key}
                className="py-1 pl-2 flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                <div className="relative">
                  <UserAvatar
                    className="h-9 w-9 border border-neutral-300"
                    user={{
                      image: user.userOne?.image || null,
                    }}
                  />
                  {/* green badge for online */}

                  {userData?.user.id === user.userOne.id && (
                    <div className="absolute right-0 bottom-[1px] h-2.5 w-2.5 bg-green-600 rounded-full border border-neutral-100" />
                  )}
                </div>

                <span className="font-semibold text-neutral-700 dark:text-neutral-50 text-sm">
                  {user.userOne?.name}
                </span>
              </div>
            );
          }

          if (user.userTwo) {
            return (
              <div
                onClick={() => onOpen("directMessage", [user.userTwo])}
                key={key}
                className="py-1 pl-2  flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                <div className="relative">
                  <UserAvatar
                    className="h-9 w-9 border border-neutral-300"
                    user={{
                      image: user.userTwo?.image || null,
                    }}
                  />

                  {userData?.user.id === user.userTwo.id && (
                    <div className="absolute right-0 bottom-[1px] h-2.5 w-2.5 bg-green-600 rounded-full border border-neutral-100" />
                  )}
                </div>

                <span className="font-semibold text-neutral-700 text-sm dark:text-neutral-50">
                  {user.userTwo?.name}
                </span>
              </div>
            );
          }

          // You might want to handle the case where neither userOne nor userTwo is present
          return null;
        })}
      </div>
    </div>
  );
};

export default ChatHomeContactList;
