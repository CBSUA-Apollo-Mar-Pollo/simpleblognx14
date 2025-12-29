import React from "react";
import { Skeleton } from "../ui/Skeleton";

const UserProfileLoader = () => {
  return (
    <div className="pb-4">
      <div className="bg-neutral-200 w-full h-[60vh] pb-28 relative ">
        <div className="flex w-full h-full justify-center">
          <Skeleton className="w-[68vw] h-full bg-neutral-400 rounded-t-none rounded-b-2xl" />
        </div>
        <Skeleton className="absolute bottom-12 left-[20vw] h-44 w-44 rounded-full bg-neutral-800 z-20" />

        <Skeleton className="absolute bottom-14 left-[31vw] h-8 w-56  bg-neutral-800 z-20" />

        <div className="absolute bottom-2 right-[1vw] flex justify-end px-[17vw] gap-x-3 pt-3">
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
          <Skeleton className=" h-8 w-20  bg-neutral-800" />
        </div>
      </div>

      <div className="flex mt-4 px-[18vw] gap-x-6 w-full">
        <div className="w-full space-y-2">
          <Skeleton className="bg-neutral-500 h-36 w-full rounded-2xl" />
          <Skeleton className="bg-neutral-500 h-72 w-full rounded-2xl" />
        </div>
        <div className="w-full space-y-2">
          <Skeleton className="bg-neutral-500 h-20 w-full rounded-2xl" />
          <Skeleton className="bg-neutral-500 h-[64vh] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileLoader;
