import { Forward, MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

const LikeCommentAndShare = () => {
  return (
    <div className="flex justify-center text-neutral-300 my-1">
      <div className="flex items-center gap-2 px-5 hover:bg-gray-600  rounded cursor-pointer py-2">
        <ThumbsUp className="h-6 w-6" />
        <span className="pt-1 font-medium text-sm">Like</span>
      </div>
      <div className="flex items-center gap-2 px-5 hover:bg-gray-600   rounded cursor-pointer py-2">
        <MessageCircle className="h-6 w-6" />
        <span className=" font-medium text-sm">Comment</span>
      </div>
      <div className="flex items-center gap-2 px-5 hover:bg-gray-600   rounded cursor-pointer py-2">
        <Forward className="h-6 w-6" />
        <span className=" font-medium text-sm">Share</span>
      </div>
    </div>
  );
};

export default LikeCommentAndShare;
