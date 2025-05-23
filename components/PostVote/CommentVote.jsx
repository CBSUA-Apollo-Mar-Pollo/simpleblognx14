import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";

const CommentVote = () => {
  return (
    <div className="flex items-center my-2">
      {/* upvote button */}
      <button
        //   onClick={() => vote("UP")}
        className="hover:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full px-1 py-1"
      >
        <ArrowBigUp
          className={cn("h-6 w-6 text-zinc-700 hover:text-orange-600")}
        />
      </button>

      {/* currentvote */}
      <p className="text-center font-medium text-xs text-neutral-700 dark:text-neutral-300 px-1">
        0
      </p>

      {/* downvote button */}
      <button
        //   onClick={() => vote("DOWN")}
        className="hover:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full px-1 py-1"
      >
        <ArrowBigDown
          className={cn("h-6 w-6 text-zinc-700 hover:text-violet-300")}
        />
      </button>
    </div>
  );
};

export default CommentVote;
