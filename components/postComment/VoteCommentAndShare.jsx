import { Forward, MessageCircle } from "lucide-react";
import React from "react";
import HeartVote from "../PostVote/HeartVote";
import PostVote from "../PostVote/PostVote";

const VoteCommentAndShare = () => {
  return (
    <div className="grid grid-cols-3 text-neutral-300">
      <HeartVote />

      <div className="flex items-center justify-center gap-2 px-3 hover:bg-neutral-200 dark:hover:bg-neutral-600   rounded cursor-pointer py-1">
        <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
        <span className=" font-medium text-sm text-neutral-700 dark:text-neutral-200">
          Comment
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 px-3 hover:bg-neutral-200 dark:hover:bg-neutral-600  rounded cursor-pointer py-1">
        <Forward className="h-6 w-6  text-neutral-700 dark:text-neutral-200" />
        <span className=" font-medium text-sm text-neutral-700 dark:text-neutral-200">
          Share
        </span>
      </div>
    </div>
  );
};

export default VoteCommentAndShare;
