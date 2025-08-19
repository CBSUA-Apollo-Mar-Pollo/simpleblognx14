"use client";

import {
  ArrowBigLeft,
  History,
  Loader2,
  MoveLeft,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useSession } from "next-auth/react";

const SearchInput = () => {
  const { data: session } = useSession();
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

  const {
    data: getSearchHistory,
    status,
    refetch,
    isLoading: gettingSearchHistory,
  } = useQuery({
    queryKey: ["getSearchHistory"],
    queryFn: async () => {
      const res = await axios.get("/api/search/history");
      return res;
    },
  });

  const url = qs.stringifyUrl({
    url: "/search/top",
    query: {
      q: searchInput,
    },
  });

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && active === true) {
      setActive(false);
      const payload = { data: searchInput };
      await axios.post("/api/search/history", payload);
      router.push(url);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchInput, router]); // Add searchInput to dependencies

  useEffect(() => {
    if (active === false) {
      setSearchInput("");
    }
  }, [active]); // Add searchInput to dependencies

  useEffect(() => {
    if (active === true) {
      refetch();
    }
  }, [active]);

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
      <DropdownMenuTrigger asChild>
        <div className="relative  items-center hidden xl:flex">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            onClick={() => setActive(true)}
            placeholder={
              searchParams.get("q") ? searchParams.get("q") : `Search...`
            }
            className="pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full w-[240px] text-sm dark:placeholder:text-white"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="xl:min-w-[20vw] 2xl:min-w-[24vw] mr-20 py-3 px-2 dark:bg-neutral-800 dark:border-0 -mt-14">
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
                className="pl-5 focus-visible:ring-transparent border-gray-300 dark:border-0 dark:border-neutral-500 font-light rounded-full w-full text-base placeholder:font-light placeholder:text-base dark:placeholder:text-neutral-50 caret-black dark:caret-white"
              />
            </div>

            {searchInput.length !== 0 && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute bottom-[6px] right-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 rounded-full"
              >
                <X className=" w-7 h-7 dark:text-neutral-200 stroke-2 p-1" />
              </button>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="dark:text-white text-lg">Recent</span>
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

        {session?.user &&
          searchInput.length === 0 &&
          getSearchHistory?.data.map((item, index) => (
            <div key={index}>
              <Link href={`/search/top?q=${item.text}`}>
                <DropdownMenuItem className="dark:hover:bg-neutral-700 gap-x-3 py-2 pl-4 cursor-pointer rounded-md flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <History className="h-9 w-9 bg-neutral-200 dark:bg-neutral-700 dark:text-white p-2 rounded-full" />
                    <span className="text-neutral-800 dark:text-white text-base font-medium">
                      {item.text}
                    </span>
                  </div>
                  <X className="h-8 w-8 p-2 rounded-full dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600" />
                </DropdownMenuItem>
              </Link>
            </div>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchInput;
