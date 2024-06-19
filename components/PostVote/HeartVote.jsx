import React from "react";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const HeartVote = () => {
  return (
    <div className="flex items-center justify-center">
      {/* upvote button */}
      {/* <Button
        //   onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
        className="px-1"
      >
        <ArrowBigUp className={cn("h-7 w-7 text-zinc-700")} />
      </Button> */}

      {/* currentvote */}

      <Button
        //   onClick={() => vote("UP")}
        size="md"
        variant="ghost"
        aria-label="upvote"
        className=" hover:bg-white dark:hover:bg-neutral-500 rounded-full "
      >
        <Heart
          className={cn(
            "h-10 w-10 px-2 py-2 text-zinc-700 dark:text-neutral-300  hover:text-blue-300"
          )}
        />
      </Button>
      <p className="text-center font-medium text-base tetx-zinc-900 px-2">0</p>

      {/* downvote button */}
      {/* <Button
        //   onClick={() => vote("DOWN")}
        size="sm"
        variant="ghost"
        aria-label="downvote"
        className="px-1"
      >
        <ArrowBigDown className={cn("h-7 w-7 text-zinc-700")} />
      </Button> */}
    </div>
  );
};

export default HeartVote;
