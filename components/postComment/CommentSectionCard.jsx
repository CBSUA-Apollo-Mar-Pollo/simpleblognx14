import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import { cn, formatTimeToNow } from "@/lib/utils";

const CommentSectionCard = ({ comment, session, index }) => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div
      className="flex gap-x-2"
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <UserAvatar
        className="h-10 w-10 "
        user={{
          image: comment?.author?.image || null,
        }}
      />
      <div>
        <div className="flex items-center gap-x-1">
          <div className="bg-neutral-500 rounded-xl px-4 py-2">
            <p className="text-white text-sm font-medium">
              {comment?.author?.name}
            </p>
            <p className="text-white text-sm font-light">{comment?.text}</p>
          </div>

          {session?.user && (
            <div
              className={`hover:bg-neutral-700 py-1 px-1 rounded-full cursor-pointer ${
                isHovered === index ? "block" : "opacity-0"
              }`}
            >
              <MoreHorizontal className="text-white" />
            </div>
          )}
        </div>

        <div className=" mx-2 text-slate-200 text-xs flex items-center gap-x-2 py-2">
          <span className="font-extralight">
            {" "}
            {formatTimeToNow(new Date(comment.createdAt))}
          </span>

          <div className="flex items-center">
            {/* upvote button */}
            <button
              //   onClick={() => vote("UP")}
              className="hover:bg-neutral-800  rounded-full p-1"
            >
              <ArrowBigUp
                className={cn("h-6 w-6 text-zinc-700 hover:text-white")}
              />
            </button>

            {/* currentvote */}
            <p className="text-center font-medium text-xs text-zinc-300 px-2">
              0
            </p>

            {/* downvote button */}
            <button
              //   onClick={() => vote("DOWN")}
              className="hover:bg-neutral-800 rounded-full p-1"
            >
              <ArrowBigDown
                className={cn("h-6 w-6 text-zinc-700 hover:text-white")}
              />
            </button>
          </div>

          <span className="hover:underline cursor-pointer">Reply</span>
        </div>
      </div>
    </div>
  );
};

export default CommentSectionCard;
