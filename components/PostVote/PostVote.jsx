import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";

const PostVote = () => {
  return (
    <div className="flex items-center justify-center my-2 gap-x-2">
      {/* upvote button */}
      <button
        //   onClick={() => vote("UP")}
        className=""
      >
        <ArrowBigUp
          className={cn(
            "h-10 w-10 text-neutral-600 hover:text-orange-600 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full p-1.5"
          )}
        />
      </button>

      {/* currentvote */}
      <p className="text-center font-semibold  text-neutral-600 px-1 dark:text-neutral-200">
        0
      </p>

      {/* downvote button */}
      <button
      //   onClick={() => vote("DOWN")}
      >
        <ArrowBigDown
          className={cn(
            "h-10 w-10  text-neutral-600 hover:text-violet-800 dark:hover:text-violet-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full p-1.5"
          )}
        />
      </button>
    </div>
  );
};

export default PostVote;
