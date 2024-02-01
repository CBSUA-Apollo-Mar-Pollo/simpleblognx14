"use client";

import { useEffect } from "react";
import UserAvatar from "../UserAvatar";
import CreateComment from "./CreateComment";
import { formatTimeToNow } from "@/lib/utils";
import { Button } from "../ui/Button";

const CommentSection = ({ session, postId, comments }) => {
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
      <div className={`${session?.user ? "pb-[25vh]" : "pb-[10vh]"} mt-2 px-4`}>
        <div className="text-end py-2">
          <p className="text-neutral-300 text-sm font-medium">
            <span className="px-2 cursor-pointer">Top comments</span>
          </p>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-x-2">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                image: comment?.author?.image || null,
              }}
            />
            <div>
              <div className="bg-neutral-500 rounded-xl px-4 py-2">
                <p className="text-white text-sm font-medium">
                  {comment.author.name}
                </p>
                <p className="text-white text-sm font-light">{comment.text}</p>
              </div>
              <div className=" mx-2 text-slate-200 text-xs flex gap-x-2 py-2">
                <span className="font-extralight ">
                  {" "}
                  {formatTimeToNow(new Date(comment.createdAt))}
                </span>
                <span className="hover:underline cursor-pointer">Like</span>
                <span className="hover:underline cursor-pointer">Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {session?.user && <CreateComment session={session} postId={postId} />}
    </>
  );
};

export default CommentSection;
