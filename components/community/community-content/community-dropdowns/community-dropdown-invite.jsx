import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Link, Plus, Triangle, User } from "lucide-react";
import React from "react";

const CommunityDropdownInvite = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="px-3 py-2 text-black bg-white border border-neutral-300 hover:bg-neutral-200">
          <Plus className="h-4 w-4 mr-1" />
          Invite
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-[15.5vw] bg-transparent shadow-none border-none min-h-[30vh] min-w-[25vw]">
        <div className="flex flex-col items-end relative">
          <Triangle className="-rotate-90 text-white fill-white z-20" />
          <div className="bg-white absolute top-[10px] right-[2px] shadow-lg z-10 rounded-md p-2 pb-2">
            <Button
              variant="ghost"
              className="flex items-start justify-start gap-x-2 pb-12 w-full"
            >
              <User className="mt-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Invite friends</span>
                <span className="text-xs text-neutral-600">
                  Invite people you're connected to
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="flex items-start gap-x-2 pb-12 w-full"
            >
              <Link className="mt-1 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Invite with link</span>
                <span className="text-xs text-neutral-600">
                  Send an invite link so people can request to join
                </span>
              </div>
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunityDropdownInvite;
