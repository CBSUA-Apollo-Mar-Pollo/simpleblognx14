import { Forward, MessageCircle } from "lucide-react";
import React from "react";
import HeartVote from "../post-vote/HeartVote";

const VoteCommentAndShare = () => {
  return (
    <div className="flex justify-center text-neutral-300  gap-x-4">
      <div className="flex items-center gap-2 px-3 rounded cursor-pointer py-1">
        <HeartVote />
      </div>
      <div className="flex items-center gap-2 px-3 hover:bg-gray-600   rounded cursor-pointer py-1">
        <MessageCircle className="h-6 w-6" />
        <span className=" font-medium text-sm">Comment</span>
      </div>
      <div className="flex items-center gap-2 px-3 hover:bg-gray-600   rounded cursor-pointer py-1">
        <Forward className="h-6 w-6" />
        <span className=" font-medium text-sm">Share</span>
      </div>
    </div>
  );
};

export default VoteCommentAndShare;
