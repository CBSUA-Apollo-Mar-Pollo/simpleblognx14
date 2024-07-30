import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Button } from "../ui/Button";
import CreateComment from "./CreateComment";
import { getReplyName } from "@/actions/replyName";
import { useRouter } from "next/navigation";
import CommentVote from "../PostVote/CommentVote";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const CommentSectionCard = ({
  comment,
  index,
  session,
  post,
  className,
  getComments,
  refetch,
  classNameForUserAvatarReplies,
  shortsvId,
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
    if (e === index && session?.user) {
      commentRef.current.style = "opacity: 1"; // Change element style on hover
    }
    // Other actions if needed
  };

  const handleMouseLeave = () => {
    if (session?.user) {
      commentRef.current.style = "opacity: 0"; // Revert element style
    }
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
              : "h-9 w-9 cursor-pointer"
          }`}
          post="post"
          user={{
            handleName: comment.author?.handleName,
            bio: comment.author?.bio,
            birthdate: comment.author?.birthdate,
            name: comment.author?.name || null,
            image: comment.author?.image || null,
          }}
        />
        <div>
          <div className="flex items-center gap-x-1">
            <div className="bg-neutral-200 dark:bg-neutral-600 rounded-xl px-4 py-2">
              <div className="flex items-center gap-x-1">
                <p className="text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
                  {comment?.author?.name}
                </p>
                {post?.author.id === comment?.author?.id && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-500 bg-opacity-35 px-2 rounded">
                    Author
                  </span>
                )}
              </div>
              {/* comment text */}
              {replyName ? (
                <p className="text-neutral-700 dark:text-neutral-100 text-sm">
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
                <p className="text-neutral-700 dark:text-neutral-100 text-sm">
                  {comment?.text}
                </p>
              )}
            </div>

            {session?.user && (
              <div
                ref={commentRef}
                className="hover:bg-neutral-300/40 dark:hover:bg-neutral-700/80 bg-neutral-50 dark:bg-neutral-800 py-1 px-1 rounded-full cursor-pointer opacity-0"
              >
                <MoreHorizontal className=" text-neutral-700 dark:text-white" />
              </div>
            )}
          </div>

          {comment.commentImageUrl && (
            <div className="mt-1">
              <Image
                sizes="100vw"
                width={0}
                height={0}
                src={comment.commentImageUrl}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-auto transition rounded-xl"
              />
            </div>
          )}

          <div className=" mx-2 text-neutral-900 dark:text-slate-200 text-xs flex items-center gap-x-2">
            <span className="font-normal">
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
              className="hover:bg-none dark:hover:bg-neutral-800 p-0"
            >
              <span className="hover:underline cursor-pointer text-neutral-700 dark:text-neutral-200  text-xs">
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
            postId={post.id}
            getComments={getComments}
            refetch={refetch}
            className="ml-7"
            replyToName={comment?.author.name}
            commentId={comment.author.id}
            replyToId={comment.replyToId}
            setIsReplying={setIsReplying}
            commentProps={comment}
            shortsvId={shortsvId}
          />
          <Button
            onClick={() => setIsReplying(false)}
            variant="ghost"
            className="dark:text-white dark:hover:text-neutral-300 flex justify-end w-full bg-neutral-800 hover:bg-neutral-800 p-0 pr-6 -mt-3 text-xs"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default CommentSectionCard;
