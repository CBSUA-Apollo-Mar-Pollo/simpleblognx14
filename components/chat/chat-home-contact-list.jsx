import { MoreHorizontal, Search } from "lucide-react";
import React from "react";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import UserAvatar from "../utils/UserAvatar";

const ChatHomeContactList = async () => {
  const session = await getAuthSession();
  const getAllConversationsByLogInUser = await db.conversation.findMany({
    where: {
      OR: [{ userOneId: session.user.id }, { userTwoId: session.user.id }],
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });

  const users = getAllConversationsByLogInUser.map((item) => {
    let { userOne, userTwo, ...rest } = item;

    // Remove userOne if it matches session.user.id
    if (userOne.id === session.user.id) {
      userOne = null;
    }

    // Remove userTwo if it matches session.user.id
    if (userTwo.id === session.user.id) {
      userTwo = null;
    }

    // Return the new object with potentially null values
    return {
      ...rest,
      userOne,
      userTwo,
    };
  });

  return (
    <div className="mt-2 mx-4">
      <div className="flex justify-between mb-2">
        <h1 className="font-semibold text-neutral-600 text-[16px] pl-2">
          Contacts
        </h1>
        <div className="flex items-center gap-x-2">
          <Search className="h-5 w-5" />
          <MoreHorizontal />
        </div>
      </div>

      <div className=" mt-2">
        {users.map((user, index) => {
          // Generate a unique key for each item
          const key = user.id || index; // Prefer a unique identifier from user if available

          if (user.userOne) {
            return (
              <div
                key={index}
                className="py-1 pl-2 flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                <div className="relative">
                  <UserAvatar
                    className="h-9 w-9 border border-neutral-300"
                    user={{
                      image: user.userOne?.image || null,
                    }}
                  />
                  <div className="absolute right-0 bottom-[1px] h-2.5 w-2.5 bg-green-600 rounded-full border border-neutral-100" />
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
                key={index}
                className="py-1 pl-2  flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                <div className="relative">
                  <UserAvatar
                    className="h-9 w-9 border border-neutral-300"
                    user={{
                      image: user.userTwo?.image || null,
                    }}
                  />
                  <div className="absolute right-0 bottom-[1px] h-2.5 w-2.5 bg-green-600 rounded-full border border-neutral-100" />
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
