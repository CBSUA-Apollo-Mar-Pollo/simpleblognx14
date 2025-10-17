"use client";

import Link from "next/link";
import React from "react";
import UserAvatar from "../utils/UserAvatar";

import { useQuery } from "@tanstack/react-query";
import { getLastMessageUserOne } from "@/data/getLastMessageUserOne";
import { Dot } from "lucide-react";
import { formatTimeToNow } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "../ui/Skeleton";

const ChatContactsListUserOne = ({ user, index, session }) => {
  const queryKey = `lastMessagesUserOne:${user.id}`;
  const {
    data: lastMessage,
    status,
    isLoading,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await getLastMessageUserOne(user.userOne?.id, user.id);
      return res;
    },
  });

  let relativeTime = null;
  let messageCreatedAt = null;

  if (status !== "pending") {
    // Assume user.createdAt is a Date object or a string that can be parsed into a Date
    messageCreatedAt = new Date(lastMessage?.createdAt);

    // Format the date to a relative time string
    relativeTime = formatDistanceToNow(messageCreatedAt, {
      addSuffix: true,
    });
  }

  if (status === "pending") {
    return (
      <div className="flex items-center">
        <Skeleton className="h-12 rounded-full w-12" />
      </div>
    );
  }

  return (
    <Link
      href={`/chatbox/${user.userOne?.id}`}
      key={index}
      className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
    >
      <UserAvatar
        className="h-12 w-12 "
        user={{
          image: user.userOne?.image || null,
        }}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-neutral-700 dark:text-neutral-50">
          {user.userOne?.name}
        </span>
        <span className="text-xs dark:text-white flex items-center">
          {lastMessage?.content} <Dot /> {relativeTime}
        </span>
      </div>
    </Link>
  );
};

export default ChatContactsListUserOne;
