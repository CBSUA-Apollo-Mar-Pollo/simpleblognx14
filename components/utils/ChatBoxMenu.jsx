import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";
import { Expand, MoreHorizontal, PenSquare, Search } from "lucide-react";
import { Button } from "../ui/Button";
import ToolTipComp from "../utils/ToolTipComp";
import { Input } from "../ui/Input";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getFriendsList } from "@/actions/getFriendsList";
import UserAvatar from "./UserAvatar";
import { useChatWindowStore } from "@/hooks/use-chat-window-store";

const ChatBoxMenu = () => {
  const [open, setOpen] = useState(false);
  const { onOpen, data } = useChatWindowStore();
  const { data: session, isLoading } = useSession();
  // get shared post data
  const { data: friends } = useQuery({
    // Query key (unique identifier)
    queryKey: ["getFriends"],
    // Query function
    queryFn: async () => {
      const res = await getFriendsList(session.user.id);
      return res;
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none drop-shadow">
        <ToolTipComp content="Notification">
          <div
            className={`  ${
              open
                ? "bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-400 dark:bg-blue-300"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer `}
          >
            <Icons.Messager
              className={` h-5 w-5 ${
                open ? "fill-blue-500" : "fill-neutral-800 dark:fill-neutral-50"
              }`}
            />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white p-0 min-w-[22vw]  shadow-md -mr-24 dark:bg-neutral-800 dark:border-0"
        align="end"
      >
        <div className="flex items-center justify-between mx-2 ">
          <DropdownMenuLabel className="text-2xl font-bold dark:text-white">
            Chats
          </DropdownMenuLabel>
          <div className="flex justify-between">
            <ToolTipComp
              content="Options"
              className="cursor-pointer hover:bg-neutral-100 rounded-full p-2"
            >
              <MoreHorizontal className="w-9 h-9 dark:text-neutral-200" />
            </ToolTipComp>
            <span className="hover:bg-neutral-100 rounded-full p-2.5 cursor-pointer ">
              <ToolTipComp content="Options">
                <Expand className="w-[16px] h-[16px] dark:text-neutral-200" />
              </ToolTipComp>
            </span>
            <span className="hover:bg-neutral-100 rounded-full p-2.5 cursor-pointer ">
              <ToolTipComp content="Options">
                <PenSquare className="w-[17px] h-[17px] dark:text-neutral-200" />
              </ToolTipComp>
            </span>
          </div>
        </div>

        {/* search input */}
        <div className="relative flex items-center justify-center mt-2 mx-2">
          <Search className="absolute left-3 h-4 w-4 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            placeholder="Search ChatBox"
            className="h-8 pl-10 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-gray-100 font-light rounded-full  text-[13px] "
          />
        </div>

        <div className="min-h-[70vh] mx-3 py-2">
          <div className="gap-x-2 flex">
            <Button
              size="small"
              variant="secondary"
              className="hover:bg-neutral-200 rounded-full px-4 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700/50"
            >
              Inbox
            </Button>
            <Button
              size="small"
              variant="secondary"
              className="hover:bg-neutral-200 rounded-full px-4 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700/50"
            >
              Channels
            </Button>
          </div>

          <div className="mt-2">
            {isLoading ? (
              <span>loading</span>
            ) : (
              friends?.map((friend, index) =>
                friend.requesterUser.id !== session?.user.id ? (
                  <div
                    onClick={() => {
                      onOpen("directMessage", [friend.requesterUser]);
                      setOpen(false);
                    }}
                    key={index}
                    className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-md cursor-pointer"
                  >
                    <div className="relative">
                      <UserAvatar
                        className="h-12 w-12 "
                        user={{
                          image: friend?.requesterUser.image || null,
                        }}
                      />
                      <div className="absolute -right-0.5 bottom-[1px] h-[12px] w-[12px] bg-green-600 rounded-full border border-neutral-100" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-100">
                        {friend?.requesterUser.name}
                      </span>
                      {friend?.lastMessage?.userId === session?.user.id ? (
                        <span className="text-xs dark:text-neutral-100">
                          You : {friend?.lastMessage?.content}
                        </span>
                      ) : (
                        <span className="text-xs dark:text-neutral-100">
                          {friend?.lastMessage?.content}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onOpen("directMessage", [friend.user]), setOpen(false);
                    }}
                    key={index}
                    className="p-2 flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-md cursor-pointer"
                  >
                    <div className="relative">
                      <UserAvatar
                        className="h-12 w-12 "
                        user={{
                          image: friend?.user.image || null,
                        }}
                      />
                      <div className="absolute -right-0.5 bottom-[1px] h-[12px] w-[12px] bg-green-600 rounded-full border border-neutral-100" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-100">
                        {friend?.user.name}
                      </span>
                      {friend?.lastMessage?.userId === session?.user.id ? (
                        <span className="text-xs dark:text-neutral-100">
                          You : {friend?.lastMessage?.content}
                        </span>
                      ) : (
                        <span className="text-xs dark:text-neutral-100">
                          {friend?.lastMessage?.content}
                        </span>
                      )}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>

        <div className="border-t dark:border-neutral-700 py-2 text-center text-sm mt-2">
          <Link href="/chatbox" className="text-blue-600 hover:underline ">
            See All In ChatBox
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatBoxMenu;
