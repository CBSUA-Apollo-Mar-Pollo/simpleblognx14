import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";
import ToolTipComp from "../utils/ToolTipComp";

const NotificationMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <ToolTipComp content="Notification">
          <div
            className={`  ${
              open
                ? "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-300"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2 rounded-full cursor-pointer `}
          >
            <Icons.bell
              className={` ${
                open ? "text-blue-600" : "text-neutral-800"
              } dark:text-neutral-100`}
            />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white px-2 py-2 min-w-[22vw] -mr-14"
        align="end"
      >
        <div className="flex items-center justify-between mx-2">
          <DropdownMenuLabel className="text-2xl font-bold">
            Notifications
          </DropdownMenuLabel>
          <div>
            <MoreHorizontal />
          </div>
        </div>

        <div className="mx-4">
          <Button variant="ghost" className="font-semibold px-2 py-3">
            All
          </Button>
          <Button variant="ghost" className="font-semibold px-2 py-3">
            Unread
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
