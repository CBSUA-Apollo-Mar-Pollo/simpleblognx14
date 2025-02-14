import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronDown,
  Clock,
  EyeOff,
  History,
  MoreHorizontal,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Button } from "../ui/Button";

const HistoryPageComponent = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl ml-3">History Feed</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-32">
            <Button className="flex items-center py-2 px-3 gap-x-2 bg-white hover:bg-neutral-100 text-black">
              <History />
              <span>Clear history</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:bg-neutral-200 px-4 py-1 rounded-full">
            <span className="font-light text-sm">Recent</span>
            <ChevronDown className="stroke-[1px] h-5 w-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="ml-24 min-w-[10vw]">
            <Button className="flex items-center justify-start py-2 px-3 gap-x-4 bg-white hover:bg-neutral-100 text-black w-full">
              <Clock className="stroke-[1px]" />
              <span className="font-light">Recent</span>
            </Button>
            <Button className="flex items-center justify-start py-2 px-3 gap-x-4 bg-white hover:bg-neutral-100 text-black w-full">
              <div className="relative">
                <ArrowBigUp className="stroke-[1px]" />
                <ArrowBigUp className="stroke-[1px] absolute top-[7px] left-[12px] fill-white" />
              </div>
              <span className="font-light">Upvoted</span>
            </Button>
            <Button className="flex items-center justify-start py-2 px-3 gap-x-4 bg-white hover:bg-neutral-100 text-black w-full">
              <div className="relative">
                <ArrowBigDown className="stroke-[1px]" />
                <ArrowBigDown className="stroke-[1px] absolute top-[7px] left-[12px] fill-white" />
              </div>
              <span className="font-light">Downvoted</span>
            </Button>
            <Button className="flex items-center justify-start py-2 px-3 gap-x-4 bg-white hover:bg-neutral-100 text-black w-full">
              <EyeOff className="stroke-[1px]" />
              <span className="font-light">Hidden</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HistoryPageComponent;
