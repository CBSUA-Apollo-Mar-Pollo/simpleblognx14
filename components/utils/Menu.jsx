import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";
import { Grip, MoreHorizontal, Search } from "lucide-react";
import { Button } from "../ui/Button";
import ToolTipComp from "../utils/ToolTipComp";
import { Input } from "../ui/Input";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <ToolTipComp content="Menu">
          <div className=" bg-gray-100 dark:bg-neutral-600 p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-500">
            <Grip className="text-neutral-800 dark:text-neutral-100" />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-neutral-50 drop-shadow-lg px-4 py-2 min-w-[39vw] max-w-[39vw] -mr-28 relative"
        align="end"
      >
        <DropdownMenuLabel className="text-2xl font-bold">
          Menu
        </DropdownMenuLabel>

        <div className="grid grid-cols-3 gap-x-4 w-full mt-1">
          {/* all menu */}
          <div className="bg-white drop-shadow-md rounded-lg px-2 col-span-2  py-2">
            {/* search input */}
            <div className="relative flex items-center justify-center mt-2 mx-2">
              <Search className="absolute left-3 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
              <Input
                placeholder="Search Menu"
                className="h-9 pl-10 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-gray-100 font-light rounded-full  text-sm "
              />
            </div>

            <div className="mt-4">
              <h1 className="font-semibold text-neutral-800 text-base ml-4">
                Social
              </h1>

              <div className="mt-2">
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img src="/ImageIcons/event.png" className="h-7 w-7 mt-1" />
                  <div>
                    <h3 className="font-semibold">Events</h3>
                    <p className="text-sm font-light">
                      Find events and other things to do online.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/FindFriends.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Find Friends</h3>
                    <p className="text-sm font-light">
                      Explore friends and discover potential connections.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/FindGroup.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Groups</h3>
                    <p className="text-sm font-light">
                      Engage with individuals who have similar interests.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img src="/ImageIcons/post.png" className="h-8 w-8 mt-1" />
                  <div>
                    <h3 className="font-semibold">News Feeds</h3>
                    <p className="text-sm font-light">
                      Discover relevant posts from the people and pages you're
                      connected with.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/postFeeds.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Post Feeds</h3>
                    <p className="text-sm font-light">
                      See the most recent posts from your friend, pages and
                      group.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 px-4 py-2 cursor-pointer rounded-md">
                  <img src="/ImageIcons/pages.png" className="h-8 w-8 mt-1" />
                  <div>
                    <h3 className="font-semibold">Pages</h3>
                    <p className="text-sm font-light">
                      Discover and connect with businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* create menu */}
          <div className="col-span-1 bg-white shadow-md rounded-md border-t border-neutral-100">
            <h1 className="font-bold text-xl px-4 py-2">Create</h1>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
