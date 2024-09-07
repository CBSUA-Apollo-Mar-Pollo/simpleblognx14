import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";

const ShortsvVote = () => {
  return (
    <div className="flex flex-col items-center justify-center my-2 space-y-2">
      {/* upvote button */}
      <button aria-label="upvote">
        <ArrowBigUp
          className={cn(
            "h-12 w-12  text-neutral-50 hover:text-orange-600 bg-neutral-800  rounded-full p-1.5"
          )}
        />
      </button>

      {/* currentvote */}
      <p className="text-center font-semibold  text-neutral-200 px-1">0</p>

      {/* downvote button */}
      <button aria-label="downvote">
        <ArrowBigDown
          className={cn(
            "h-12 w-12 text-neutral-50  hover:text-violet-500  bg-neutral-800  rounded-full p-1.5"
          )}
        />
      </button>
    </div>
  );
};

export default ShortsvVote;
