"use client";

import { useEffect, useState } from "react";
import { Loader2, MoreHorizontal, Search } from "lucide-react";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { useChatWindowStore } from "@/hooks/use-chat-window-store";
import { useSocket } from "../Providers/socket-provider";
import { useMakeUserOnline } from "@/hooks/use-make-user-online";
import { getContactList } from "@/data/getContactList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../ui/Skeleton";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/Separator";

const ChatHomeContactList = () => {
  const { data: session } = useSession();
  const { data: conversationList, isPending } = useQueryClient({
    queryKey: ["contactlist", session?.user?.id],
    queryFn: async () => {
      const res = await getContactList(session);
      return res;
    },
    enabled: !!session?.user,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    suspense: true,
  });
  const { onOpen, data } = useChatWindowStore();
  const { socket } = useSocket();
  const [userData, setUserData] = useState([]);

  useMakeUserOnline({ session });

  useEffect(() => {
    if (!socket) return;

    const handleUserOnline = (data) => {
      const userId = data.id;
      const hasAlreadyStored = userData.some((item) => item?.id === userId);
      const isAFriend = conversationList?.some(
        (item) => item.userOneId === userId || item.userTwoId === userId
      );

      // Only add the user if they are not already stored and are a friend
      if (!hasAlreadyStored && isAFriend) {
        setUserData((prevData) => [...prevData, data]);
      }
    };

    socket.on("userOnline", handleUserOnline);

    // Clean up the event listener on component unmount
    return () => {
      socket.off("userOnline", handleUserOnline);
    };
  }, [socket, userData]);

  useEffect(() => {
    if (!socket) return;

    socket.on("userHasSignedOut", (data) => {
      setUserData((prevData) => prevData.filter((item) => item.id !== data));
    });

    return () => {
      socket.off("userHasSignedOut");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("friendsOnlineStatus", (data) => {
      const filteredData = data.filter((item) => {
        // Check if the requesterUser or user has onlineStatus set to true
        return item.requesterUser?.onlineStatus || item.user?.onlineStatus;
      });

      const hasAlreadyStored = filteredData.some((item) =>
        data.some(
          (dataItem) =>
            (dataItem.user && dataItem.user.id === item.id) ||
            (dataItem.requesterUser && dataItem.requesterUser.id === item.id)
        )
      );

      if (!hasAlreadyStored) {
        setUserData((prevData) => [
          ...prevData,
          ...filteredData
            .flatMap((dataItem) => [
              dataItem.user ? dataItem.user : null,
              dataItem.requesterUser ? dataItem.requesterUser : null,
            ])
            .filter(Boolean), // Remove any null values
        ]);
      }
    });

    return () => {
      socket.off("friendsOnlineStatus");
    };
  }, [socket]);

  // Generate a random number between 3 and 7 (or any range you want)
  const numberOfLoaders = Math.floor(Math.random() * 5) + 2;

  // Create an array with that length
  const loaders = Array.from({ length: numberOfLoaders });

  const getRandomWidthClass = () => {
    const widths = ["w-20", "w-24", "w-32", "w-40"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  if (!conversationList?.length) {
    return null;
  }

  return (
    <div className="mt-2 mx-1">
      <Separator className="my-2" />
      <div className="flex justify-between mb-2">
        <h1 className="font-semibold  dark:text-neutral-50 pl-2">Contacts</h1>

        <div className="flex items-center gap-x-2">
          <Search className="h-5 w-5 dark:text-neutral-50" />
          <MoreHorizontal className="dark:text-neutral-50" />
        </div>
      </div>

      {isPending &&
        loaders.map((_, index) => (
          <div
            key={index}
            className="w-full flex items-center gap-x-2 ml-2 mb-1"
          >
            <Skeleton className="h-10 w-10 rounded-full bg-neutral-200" />
            <Skeleton
              className={`h-4 rounded-full bg-neutral-200 ${getRandomWidthClass()}`}
            />
          </div>
        ))}

      {!isPending && (
        <div className=" mt-2">
          {(conversationList ?? []).map((user, index) => {
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

                    {userData.find((item) => item.id === user.userOne.id) && (
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

                    {userData.find((item) => item.id === user.userTwo.id) && (
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
      )}
    </div>
  );
};

export default ChatHomeContactList;
