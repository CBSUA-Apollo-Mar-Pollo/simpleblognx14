import React from "react";
import CommunitySideBar from "./community-sidebar";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";
import Image from "next/image";

const CommunityContent = ({ communitiesCreated }) => {
  return (
    <div className="">
      <div className="grid grid-cols-9">
        <div className="col-span-2 ">
          <CommunitySideBar {...{ communitiesCreated }} />
        </div>

        <div className="col-span-7 mx-80 mt-4">
          <div className="relative flex items-center mb-2">
            <Search className="absolute left-4 h-5 w-5 text-neutral-700 z-10 dark:text-neutral-300" />
            <Input
              placeholder="Search Community"
              className="h-10 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-neutral-200 font-light rounded-full w-full text-sm "
            />
          </div>

          <span className="ml-3 text-sm dark:text-white">Recent posts</span>

          {/* render when user is not yet a part of any community */}
          <div className="flex flex-col items-center mt-4">
            <Image
              src="/5235.jpg"
              width={800}
              height={800}
              className="h-[60-vh] w-[70vw] rounded-3xl"
            />
            <p className="text-xl mt-2 dark:text-white">
              "Discover shared interests and passions by joining a community or
              creating your own".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityContent;
