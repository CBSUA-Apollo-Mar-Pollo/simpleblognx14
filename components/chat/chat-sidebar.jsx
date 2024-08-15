"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MoreHorizontal, Pencil, Search } from "lucide-react";
import ChatContactsListUserOne from "./chat-contacts-lists-user-one";
import ChatContactsListUserTwo from "./chat-contacts-lists-user-two";

const ChatSideBar = ({ users, session }) => {
  return (
    <>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-3xl font-extrabold dark:text-neutral-100">Chats</h1>
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            className="bg-neutral-200 hover:bg-neutral-300/80 dark:bg-neutral-700/95 dark:hover:bg-neutral-600  rounded-full"
          >
            <MoreHorizontal className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
          </Button>
          <Button
            size="icon"
            className="bg-neutral-200 hover:bg-neutral-300/80 dark:bg-neutral-700/95 dark:hover:bg-neutral-600 rounded-full "
          >
            <Pencil className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
          </Button>
        </div>
      </div>

      <div className="mx-4 relative">
        <Search className="absolute top-[10px] left-3 z-30 h-5 w-5 text-neutral-700 dark:text-neutral-100" />
        <Input
          placeholder="Search Chatbox..."
          className="rounded-full bg-neutral-100 pl-10 text-neutral-700 dark:border-none dark:placeholder:text-neutral-200"
        />
      </div>

      <div className="flex justify-center bg-neutral-100 dark:bg-neutral-700 drop-shadow-sm mx-4 rounded-full mt-4 gap-x-2 px-2 py-1">
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 bg-white font-semibold drop-shadow-sm"
        >
          All Chats
        </Button>
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 font-semibold dark:text-neutral-50"
        >
          Groups
        </Button>
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 font-semibold dark:text-neutral-50"
        >
          Contacts
        </Button>
      </div>

      <div className="mx-4 mt-2">
        {users.map((user, index) => {
          // Generate a unique key for each item
          const key = user.id || index; // Prefer a unique identifier from user if available

          if (user.userOne) {
            return (
              <ChatContactsListUserOne
                key={key} // Add key here
                user={user}
                index={index}
                session={session}
              />
            );
          }

          if (user.userTwo) {
            return (
              <ChatContactsListUserTwo
                key={key} // Add key here
                user={user}
                index={index}
                session={session}
              />
            );
          }

          // You might want to handle the case where neither userOne nor userTwo is present
          return null;
        })}
      </div>
    </>
  );
};

export default ChatSideBar;
