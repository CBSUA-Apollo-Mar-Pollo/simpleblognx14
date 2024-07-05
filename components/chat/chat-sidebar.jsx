"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MoreHorizontal, Pencil, Search } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";

const ChatSideBar = ({ friendLists, session }) => {
  return (
    <>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-3xl font-extrabold">Chats</h1>
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            className="bg-neutral-200 hover:bg-neutral-300/80 rounded-full"
          >
            <MoreHorizontal className="h-6 w-6 text-neutral-800" />
          </Button>
          <Button
            size="icon"
            className="bg-neutral-200 hover:bg-neutral-300/80 rounded-full"
          >
            <Pencil className="h-6 w-6 text-neutral-800" />
          </Button>
        </div>
      </div>

      <div className="mx-4 relative">
        <Search className="absolute top-[10px] left-3 z-30 h-5 w-5 text-neutral-700" />
        <Input
          placeholder="Search Chatbox..."
          className="rounded-full bg-neutral-100 pl-10 text-neutral-700"
        />
      </div>

      <div className="flex justify-center bg-neutral-100 drop-shadow-sm mx-4 rounded-full mt-4 gap-x-2 px-2 py-1">
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 bg-white font-semibold drop-shadow-sm"
        >
          All Chats
        </Button>
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 font-semibold"
        >
          Groups
        </Button>
        <Button
          variant="ghost"
          className="rounded-full h-8 my-1 flex-1 font-semibold"
        >
          Contacts
        </Button>
      </div>

      <div className="mx-4 mt-2">
        {friendLists?.map((friend, index) =>
          friend.requesterUser.id !== session?.user.id ? (
            <div
              key={index}
              className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 rounded-md cursor-pointer"
            >
              <UserAvatar
                className="h-12 w-12 "
                user={{
                  image: friend?.requesterUser.image || null,
                }}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-700">
                  {friend?.requesterUser.name}
                </span>
                <span className="text-xs">message example</span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 rounded-md cursor-pointer"
            >
              <UserAvatar
                className="h-12 w-12 "
                user={{
                  image: friend?.user.image || null,
                }}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-700">
                  {friend?.user.name}
                </span>
                <span className="text-xs">message example</span>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatSideBar;
