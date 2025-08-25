import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/Dropdown-menu";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";

const SearchVideoInput = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative  items-center hidden xl:flex">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            placeholder="Search videos"
            className="pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-300/50  rounded-full w-[20vw] text-sm dark:placeholder:text-white"
          />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default SearchVideoInput;
