import React from "react";
import { Skeleton } from "../ui/Skeleton";

const HomeFeedLoader = () => {
  return (
    <div className="flex flex-col space-y-2 mt-12">
      <div className="flex justify-center w-full">
        <Skeleton className="h-[60vh] w-[38vw] bg-neutral-300 rounded-xl">
          <div className="px-4 pt-3 flex items-center gap-x-3">
            <Skeleton className="h-12 w-12 bg-neutral-400 rounded-full" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-3 w-24 bg-neutral-400 rounded-full" />
              <Skeleton className="h-2 w-12 bg-neutral-400 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-[46vh] bg-neutral-400 mt-4 mb-2" />

          <div className="grid grid-cols-3 px-4 gap-x-3">
            <Skeleton className="h-7 bg-neutral-400" />
            <Skeleton className="h-7 bg-neutral-400" />
            <Skeleton className="h-7 bg-neutral-400" />
          </div>
        </Skeleton>
      </div>
      <div className="flex justify-center w-full">
        <Skeleton className="h-[20vh] w-[38vw] bg-neutral-300 rounded-xl">
          <div className="px-4 pt-3 flex items-center gap-x-3">
            <Skeleton className="h-12 w-12 bg-neutral-400 rounded-full" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-3 w-24 bg-neutral-400 rounded-full" />
              <Skeleton className="h-2 w-12 bg-neutral-400 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-[1.5vh] w-[18vw] bg-neutral-400 my-2 mb-2 ml-4" />
          <Skeleton className="h-[1.5vh] w-[12vw] bg-neutral-400 my-2 mb-2 ml-4" />
          <Skeleton className="h-[1.5vh] w-[4vw] bg-neutral-400 my-2 mb-2 ml-4" />
          <div className="grid grid-cols-3 px-4 gap-x-3">
            <Skeleton className="h-7 bg-neutral-400" />
            <Skeleton className="h-7 bg-neutral-400" />
            <Skeleton className="h-7 bg-neutral-400" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default HomeFeedLoader;
