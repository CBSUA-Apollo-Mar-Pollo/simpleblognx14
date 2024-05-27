import React from "react";
import { Skeleton } from "../ui/Skeleton";
import { Icons } from "../utils/Icons";
import { Loader2 } from "lucide-react";

const PostCardLoader = () => {
  return (
    <div>
      <Skeleton className="h-[30rem] w-full bg-neutral-400 rounded-none">
        <div className="flex items-center justify-center h-full">
          {/* <Icons.ImageLoaderIcon className="h-24 w-24 fill-neutral-500" /> */}
          <Loader2 className="w-10 h-10  animate-spin text-neutral-200" />
        </div>
      </Skeleton>
    </div>
  );
};

export default PostCardLoader;
