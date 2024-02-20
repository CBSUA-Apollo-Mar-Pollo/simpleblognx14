import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Button } from "../ui/Button";
import CreateComment from "./CreateComment";
import { getReplyName } from "@/actions/replyName";

const CommentSectionCard = ({
  comment,
  index,
  session,
  postId,
  className,
  getComments,
  refetch,
}) => {
  const [isHovered, setIsHovered] = useState(null);
  const [isReplying, setIsReplying] = useState(false);

  console.log(comment);
  return (
    <div
      className=" gap-x-2"
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="flex gap-x-2">
        <UserAvatar
          className="h-9 w-9 "
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

            <Button
              onClick={() => setIsReplying(true)}
              variant="ghost"
              className="bg-neutral-800 hover:bg-neutral-800 p-0"
            >
              <span className="hover:underline cursor-pointer text-neutral-200 ">
                Reply
              </span>
            </Button>
          </div>
        </div>
      </div>

      {isReplying && (
        <>
          <CreateComment
            session={session}
            postId={postId}
            getComments={getComments}
            refetch={refetch}
            className="ml-7"
            replyToName={comment?.author.name}
            commentId={comment.author.id}
            replyToId={comment.replyToId}
            setIsReplying={setIsReplying}
            commentProps={comment}
          />
          <Button
            onClick={() => setIsReplying(false)}
            variant="ghost"
            className="text-white flex justify-end w-full bg-neutral-800 hover:bg-neutral-800 p-0 pr-6 -mt-3 text-xs"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default CommentSectionCard;
