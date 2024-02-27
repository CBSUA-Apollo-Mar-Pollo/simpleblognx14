import React from "react";
import { Skeleton } from "../ui/Skeleton";
import { Dot, Globe } from "lucide-react";
import { Icons } from "../utils/Icons";

const SharedPostCardLoader = () => {
  return (
    <div className="mx-5 mb-2">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <Skeleton className="h-[30rem]  w-full bg-neutral-400 rounded-t-2xl rounded-b-none">
          <div className="flex items-center justify-center h-full">
            <Icons.ImageLoaderIcon className="h-24 w-24 fill-neutral-500" />
          </div>
        </Skeleton>
        <div className=" gap-1 my-2 mx-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-10 w-10 rounded-full bg-neutral-400" />

            <div className="px-2 pt-1">
              <Skeleton className="w-20 h-3.5 bg-neutral-400 rounded-full" />
              <div className="flex items-center">
                <Skeleton className="w-10 h-2 bg-neutral-400" />
                <Dot className="-mx-1 text-gray-600" />
                <Globe className="h-3 w-3 text-gray-600" />
              </div>
            </div>
          </div>

          <Skeleton className="h-3.5 w-[20rem] bg-neutral-400 my-2 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SharedPostCardLoader;
