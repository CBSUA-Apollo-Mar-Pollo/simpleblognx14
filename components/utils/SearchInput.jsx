"use client";

import { ArrowBigLeft, Loader2, MoveLeft, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [returnData, setReturnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resEmpty, setResEmpty] = useState(false);
  const [active, setActive] = useState(false);
  const searchParams = useSearchParams();

  const router = useRouter();

  const { mutate: handleSearch } = useMutation({
    mutationFn: async () => {
      if (searchInput) {
        const payload = { data: searchInput };
        const { data } = await axios.post("/api/search", payload);
        return data;
      }
    },
    onError: (err) => {
      console.error(err);
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setReturnData(data);
      setResEmpty(data.length === 0);
      setIsLoading(false);
    },
  });

  const url = qs.stringifyUrl({
    url: "/search/top",
    query: {
      q: searchInput,
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(url);
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchInput, router]); // Add searchInput to dependencies

  const handleTyping = (e) => {
    setSearchInput(e.target.value);
    setIsLoading(true);
    setResEmpty(false);

    // Debounce search: wait 300ms after the user stops typing
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch();
    }, 300);
  };

  return (
    <DropdownMenu modal={false} open={active} onOpenChange={setActive}>
      <DropdownMenuTrigger>
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            onClick={() => setActive(true)}
            placeholder={
              searchParams.get("q") ? searchParams.get("q") : `Search...`
            }
            className="pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200 font-light rounded-full w-[240px] text-sm"
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
            <div className="w-full">
              <Input
                value={searchInput}
                onChange={handleTyping}
                placeholder="Search"
                className="pl-5 focus-visible:ring-transparent border-gray-300 dark:border-0 dark:border-neutral-500 font-light rounded-full w-full text-base placeholder:font-light placeholder:text-base"
              />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="text-white text-lg">Recent</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 font-normal text-sm dark:hover:bg-neutral-700"
            >
              Edit
            </Button>
          </div>
        </DropdownMenuLabel>

        {returnData?.length > 0 &&
          searchInput &&
          returnData.map((rd, index) => (
            <div key={index}>
              <Link href={url}>
                <DropdownMenuItem className="dark:hover:bg-neutral-700 gap-x-3 py-2 pl-4 cursor-pointer rounded-md">
                  <Search className="h-9 w-9 bg-neutral-200 p-2 rounded-full" />
                  <span className="text-neutral-800 dark:text-white text-base font-medium">
                    {rd.name}
                  </span>
                </DropdownMenuItem>
              </Link>
            </div>
          ))}

        {resEmpty && (
          <div className="flex justify-center my-4">
            <span className="dark:text-neutral-50">No results found!</span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-zinc-500 animate-spin mb-2" />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchInput;
