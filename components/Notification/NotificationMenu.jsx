import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Icons } from "../Icons";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

const NotificationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
          <Icons.bell className="text-gray-500 " />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white px-2 py-2 min-w-[22vw] -mr-10"
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
