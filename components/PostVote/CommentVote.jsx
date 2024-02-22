import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";

const CommentVote = () => {
  return (
    <div className="flex items-center">
      {/* upvote button */}
      <button
        //   onClick={() => vote("UP")}
        className="hover:bg-neutral-800  rounded-full px-0.5"
      >
        <ArrowBigUp className={cn("h-5 w-6 text-zinc-700 hover:text-white")} />
      </button>

      {/* currentvote */}
      <p className="text-center font-medium text-xs text-zinc-300 ">0</p>

      {/* downvote button */}
      <button
        //   onClick={() => vote("DOWN")}
        className="hover:bg-neutral-800 rounded-full px-0.5"
      >
        <ArrowBigDown
          className={cn("h-5 w-6 text-zinc-700 hover:text-white")}
        />
      </button>
    </div>
  );
};

export default CommentVote;
