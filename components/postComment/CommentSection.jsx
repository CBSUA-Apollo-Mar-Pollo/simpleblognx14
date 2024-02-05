"use client";

import { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import CreateComment from "./CreateComment";
import { cn, formatTimeToNow } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import PostVote from "../post-vote/PostVote";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";

const CommentSection = ({ session, postId, comments, fetch }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(null);
  useEffect(() => {
    // Remove the body scrollbar when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable the body scrollbar when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <>
      <div className="mt-2 pl-4 pr-1 overflow-auto">
        <div className="text-end py-2">
          <p className="text-neutral-300 text-sm font-medium">
            <span className="px-2 cursor-pointer">Top comments</span>
          </p>
        </div>
        {comments.map((comment, index) => (
          <div
            key={index}
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
                  <p className="text-white text-sm font-light">
                    {comment?.text}
                  </p>
                </div>

                <div
                  className={`hover:bg-neutral-700 py-1 px-1 rounded-full cursor-pointer ${
                    isHovered === index ? "block" : "opacity-0"
                  }`}
                >
                  <MoreHorizontal className="text-white" />
                </div>
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
        ))}
      </div>

      {session?.user && (
        <div
          className={`fixed bottom-0 ${
            pathname.startsWith("/postComment") ? "w-[25vw]" : "w-full"
          }`}
        >
          <CreateComment session={session} postId={postId} fetch={fetch} />
        </div>
      )}
    </>
  );
};

export default CommentSection;
