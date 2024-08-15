"use client";

import Link from "next/link";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { useQuery } from "@tanstack/react-query";
import { getLastMessageUserTwo } from "@/actions/getLastMessageUserTwo";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";
import { Skeleton } from "../ui/Skeleton";

const ChatContactsListUserTwo = ({ user, index, session }) => {
  const queryKey = `lastMessagesUserTwo:${user.id}`;
  const { data: lastMessage, status } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await getLastMessageUserTwo(user.userTwo?.id, user.id);
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
      href={`/chatbox/${user.userTwo?.id}`}
      key={index}
      className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
    >
      <UserAvatar
        className="h-12 w-12 "
        user={{
          image: user.userTwo?.image || null,
        }}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-neutral-700 dark:text-neutral-50">
          {user.userTwo?.name}
        </span>
        <span className="text-xs dark:text-white flex items-center">
          {lastMessage?.content} <Dot /> {relativeTime}
        </span>
      </div>
    </Link>
  );
};

export default ChatContactsListUserTwo;
