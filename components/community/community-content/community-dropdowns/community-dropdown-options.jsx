import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import {
  Bell,
  LogOut,
  MoreHorizontal,
  Pin,
  Shield,
  Triangle,
  User,
  UserPlus,
} from "lucide-react";
import React from "react";

const CommunityDropdownOptions = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="px-2 py-2 text-black bg-white border dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 border-neutral-300 hover:bg-neutral-200 rounded-full">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-[3.7vw] bg-transparent shadow-none border-none min-h-[35vh] min-w-[25vw] ">
        <div className="flex flex-col items-end relative">
          <Triangle className="-rotate-90 text-white fill-white dark:fill-neutral-800 dark:text-neutral-800  z-20 " />
          <div className="bg-white absolute top-[10px] right-[2px] shadow-lg z-10 rounded-md p-2 pb-2 min-w-[16vw] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.60)] dark:bg-neutral-800 dark:text-neutral-200">
            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-5  w-full "
            >
              <UserPlus className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                View member requests
              </span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-5  w-full"
            >
              <Shield className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Group status
              </span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-3  w-full"
            >
              <Icons.YourContent className="h-7 w-7  dark:fill-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Your content
              </span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-5  w-full"
            >
              <Bell className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Manage notifications
              </span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-5  w-full"
            >
              <Pin className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Pin community
              </span>
            </Button>

            <div className="py-2">
              <Separator className="bg-neutral-200" />
            </div>

            <Button
              variant="ghost"
              className="flex items-center justify-start  gap-x-3  w-full"
            >
              <LogOut className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Leave community
              </span>
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunityDropdownOptions;
