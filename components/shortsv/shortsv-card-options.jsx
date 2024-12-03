import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Button } from "../ui/Button";
import {
  Bookmark,
  BookMarked,
  Bug,
  Link,
  MessageSquareWarning,
  MoreHorizontal,
  Triangle,
  User,
  XSquare,
} from "lucide-react";

const ShortsVCardOptions = () => {
  const handleTriggerClick = (event) => {
    event.stopPropagation();
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => handleTriggerClick(e)}
          className="px-3 py-2 text-black bg-transparent hover:bg-neutral-800/65 rounded-full"
        >
          <MoreHorizontal className="stroke-white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-[24vw] bg-transparent shadow-none border-none min-h-[30vh] min-w-[25vw]">
        <div className="flex flex-col items-end relative">
          <Triangle className="-rotate-90 text-white fill-white z-20" />
          <div className="bg-white absolute top-[9px] right-[2.6px] shadow-lg z-10 rounded-md p-2 pb-2">
            <Button
              variant="ghost"
              className="flex items-start justify-start gap-x-3 pb-12 w-full"
            >
              <Bookmark className="mt-1 h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Save shortsv</span>
                <span className="text-xs text-neutral-600">
                  Add this to your saved items
                </span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-x-3  w-full"
            >
              <Link className="mt-1 h-5 w-5" />
              <span className="text-sm font-semibold">Copy link</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-x-3  w-full"
            >
              <MessageSquareWarning className="mt-1 h-5 w-5" />
              <span className="text-sm font-semibold">Report video</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-x-3  w-full"
            >
              <Bug className="mt-1 h-5 w-5" />
              <span className="text-sm font-semibold">
                Something isn't working
              </span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-start justify-start gap-x-3 pb-12 w-full"
            >
              <XSquare className="mt-1 h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">Hide post</span>
                <span className="text-xs text-neutral-600">
                  See fewer posts like this.
                </span>
              </div>
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShortsVCardOptions;
