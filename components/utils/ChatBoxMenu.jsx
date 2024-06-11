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

const ChatBoxMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <ToolTipComp content="Notification">
          <div
            className={`  ${
              open
                ? "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-400"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer `}
          >
            <Icons.Messager
              className={` h-5 w-5 ${
                open ? "fill-blue-400" : "fill-neutral-800 dark:fill-neutral-50"
              }`}
            />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white p-0 min-w-[22vw]  shadow-md -mr-28 dark:bg-neutral-800 dark:border-0"
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

        <div className="min-h-[70vh]"></div>

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
