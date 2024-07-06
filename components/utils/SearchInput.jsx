"use client";

import { ArrowBigLeft, Loader2, MoveLeft, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Button } from "../ui/Button";
import UserAvatar from "./UserAvatar";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [returnData, setReturnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const { mutate: handleSearch } = useMutation({
    mutationFn: async () => {
      const payload = {
        data: searchInput,
      };
      if (searchInput) {
        const { data } = await axios.post("/api/search", payload);
        return data;
      }
    },
    onError: (err) => {
      setIsLoading(false);
      console.log(err);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setReturnData(data);
    },
  });

  // Function to handle search after user stops typing for 500ms
  const handleTyping = () => {
    setIsLoading(true);
    setTimeout(() => {
      handleSearch();
    }, 3000); // Adjust this value to set the delay
  };

  return (
    <DropdownMenu modal={false} open={active} onOpenChange={setActive}>
      <DropdownMenuTrigger className="">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            onClick={() => setActive(true)}
            placeholder="Search..."
            className="pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-gray-100 font-light rounded-full w-[250px] text-sm "
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[24vw] mr-20 py-3 px-2 dark:bg-neutral-800 dark:border-0 -mt-14">
        <DropdownMenuLabel className="flex items-center">
          <Button
            onClick={() => setActive(false)}
            variant="ghost"
            size="sm"
            className="text-white text-base dark:hover:bg-neutral-700 hover:rounded-full py-5 mr-2"
          >
            <MoveLeft className="text-neutral-800 dark:text-neutral-200" />
          </Button>
          <div className="relative flex items-center w-full">
            <Input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleTyping();
              }}
              placeholder="Search"
              className="pl-5 focus-visible:ring-transparent  border-gray-300 dark:border-0 dark:border-neutral-500 font-light rounded-full w-full text-base placeholder:font-light placeholder:text-base"
            />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="text-white text-lg">Recent</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 font-normal text-base dark:hover:bg-neutral-700"
            >
              Edit
            </Button>
          </div>
        </DropdownMenuLabel>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin mb-2" />
          </div>
        ) : (
          returnData &&
          returnData.map((rd, index) => (
            <div key={index}>
              <DropdownMenuItem className="dark:hover:bg-neutral-700 gap-x-3 py-2 pl-4 cursor-pointer rounded-md">
                <UserAvatar
                  className="h-10 w-10"
                  user={{ name: rd.name || null, image: rd?.image || null }}
                />
                <span className="text-neutral-800 dark:text-white text-base font-medium">
                  {rd.name}
                </span>
              </DropdownMenuItem>
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchInput;
