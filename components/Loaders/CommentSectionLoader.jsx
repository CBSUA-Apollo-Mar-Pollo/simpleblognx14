import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CommentSectionLoader = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-neutral-700" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-neutral-700" />
          <Skeleton className="h-20 w-[250px] bg-neutral-700" />
        </div>
      </div>
      <div className="flex  space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-neutral-700" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-neutral-700" />
          <Skeleton className="h-20 w-[250px] bg-neutral-700" />
        </div>
      </div>
      <div className="flex  space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-neutral-700" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-neutral-700" />
          <Skeleton className="h-20 w-[250px] bg-neutral-700" />
        </div>
      </div>
    </div>
  );
};

export default CommentSectionLoader;
