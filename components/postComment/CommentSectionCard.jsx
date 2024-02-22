import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../UserAvatar";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Button } from "../ui/Button";
import CreateComment from "./CreateComment";
import { getReplyName } from "@/actions/replyName";
import { useRouter } from "next/navigation";
import CommentVote from "../post-vote/CommentVote";
import { useQuery } from "@tanstack/react-query";

const CommentSectionCard = ({
  comment,
  index,
  session,
  postId,
  className,
  getComments,
  refetch,
  classNameForUserAvatarReplies,
}) => {
  const commentRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();

  const { data: replyName, error } = useQuery({
    queryKey: ["replyName", comment.commentId],
    queryFn: async () => {
      const res = await getReplyName(comment.commentId);
      return res;
    },
  });

  const handleMouseEnter = (e) => {
    if (e === index) {
      commentRef.current.style = "opacity: 1"; // Change element style on hover
    }
    // Other actions if needed
  };

  const handleMouseLeave = () => {
    commentRef.current.style = "opacity: 0"; // Revert element style
    // Other actions if needed
  };

  return (
    <div
      className=" gap-x-2"
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(null)}
    >
      <div className="flex gap-x-2">
        <UserAvatar
          className={`${
            classNameForUserAvatarReplies
              ? classNameForUserAvatarReplies
              : "h-9 w-9"
          }`}
          user={{
            image: comment?.author?.image || null,
          }}
        />
        <div>
          <div className="flex items-center gap-x-1">
            <div className="bg-neutral-600 rounded-xl px-4 py-2">
              <p className="text-white text-xs font-semibold">
                {comment?.author?.name}
              </p>
              {replyName ? (
                <p className="text-neutral-100 text-sm">
                  <span className="text-blue-400">
                    <a
                      href={`/user/${replyName.id}`}
                      className="font-medium hover:underline"
                    >
                      @{replyName.name}
                    </a>
                  </span>{" "}
                  {comment.text.startsWith("@") &&
                    comment.text.substring(comment.text.indexOf(" ") + 1)}
                </p>
              ) : (
                <p className="text-neutral-100 text-sm">{comment?.text}</p>
              )}
            </div>

            {session?.user && (
              <div
                ref={commentRef}
                className="hover:bg-neutral-700 py-1 px-1 rounded-full cursor-pointer opacity-0"
              >
                <MoreHorizontal className="text-white" />
              </div>
            )}
          </div>

          <div className=" mx-2 text-slate-200 text-xs flex items-center gap-x-2">
            <span className="font-extralight">
              {" "}
              {formatTimeToNow(new Date(comment.createdAt))}
            </span>

            {/* for voting comment */}
            <CommentVote />

            {/* reply button */}
            <Button
              onClick={() => {
                session?.user ? setIsReplying(true) : router.push("/sign-in");
              }}
              variant="ghost"
              className="bg-neutral-800 hover:bg-neutral-800 p-0"
            >
              <span className="hover:underline cursor-pointer text-neutral-200 text-xs">
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
