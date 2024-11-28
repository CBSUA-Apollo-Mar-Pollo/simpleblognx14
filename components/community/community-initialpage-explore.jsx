import CommunityInitialPageSideBar from "@/components/community/community-initialpage-sidebar";
import { Input } from "@/components/ui/Input";
import { Dot, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";

const CommunityInitialPageExplore = ({
  sesssion,
  communitiesCreated,
  communities,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-9">
        <div className="col-span-2 ">
          <CommunityInitialPageSideBar {...{ communitiesCreated }} />
        </div>

        <div className="col-span-7  mt-4 ml-10">
          <div className="relative flex items-center mb-2 w-[25vw]">
            <Search className="absolute left-4 h-5 w-5 text-neutral-700 z-10 dark:text-neutral-300" />
            <Input
              placeholder="Search Community"
              className="h-10 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-neutral-200 font-light rounded-full w-full text-sm "
            />
          </div>

          <span className="ml-3 text-lg font-bold dark:text-white">
            More Suggestions
          </span>

          <div className="mt-4 grid grid-cols-3 gap-x-2">
            {communities.map((community) => (
              <div
                className="border-[1.5px] dark:border-neutral-500 rounded-lg mx-2 bg-neutral-800"
                key={community.id}
              >
                <div className="relative">
                  <div className="overflow-hidden h-[13vh] scroll-container bg-neutral-900 z-20 rounded-t-lg border-b border-neutral-500">
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={community.banner}
                      alt="profile image"
                      referrerPolicy="no-referrer"
                      className="w-full"
                      // style={{ transform: "translateY()" }} // Adjust the percentage as needed
                    />
                  </div>

                  <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 z-10">
                    <UserAvatar
                      className="h-20 w-20 border-2 border-neutral-50 dark:border-neutral-500"
                      user={{
                        image: community.icon || null,
                      }}
                    />
                  </div>
                </div>

                <div className=" pt-5 pl-4 pb-2 rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold">
                    {community.name}
                  </h3>

                  <div className="flex items-center dark:text-neutral-300 text-sm">
                    <span>{community.members.length} member</span>
                    <Dot />
                    <span>1 post a day</span>
                  </div>
                </div>

                <div className="w-full flex justify-center mb-4 mt-1">
                  <Button className="dark:bg-neutral-600 hover:dark:bg-neutral-500 w-full mx-4">
                    Join community
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityInitialPageExplore;
