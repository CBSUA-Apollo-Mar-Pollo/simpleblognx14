import React from "react";
import { Skeleton } from "../ui/Skeleton";
import { Icons } from "../utils/Icons";

const PostCardLoader = () => {
  return (
    <div>
      <Skeleton className="h-[30rem] w-full bg-neutral-400 rounded-none">
        <div className="flex items-center justify-center h-full">
          <Icons.ImageLoaderIcon className="h-24 w-24 fill-neutral-500" />
        </div>
      </Skeleton>
    </div>
  );
};

export default PostCardLoader;
