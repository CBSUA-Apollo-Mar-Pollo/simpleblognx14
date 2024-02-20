"use client";

import { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import CreateComment from "./CreateComment";
import { cn, formatTimeToNow } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { COMMENT_PAGE } from "@/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import CommentSectionCard from "./CommentSectionCard";
import { getReplyName } from "@/actions/replyName";

const CommentSection = ({ session, postId, initialComments, getComments }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Remove the body scrollbar when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable the body scrollbar when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const fetchComments = async ({ pageParam }) => {
    const query = `/api/posts/fetchNextComments?limit=${COMMENT_PAGE}&page=${pageParam}&postId=${postId}`;

    const res = await fetch(query, { cache: "no-store" });

    return res.json();
  };

  const { data, fetchNextPage, refetch, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["viewMoreComments"],
      queryFn: fetchComments,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = lastPage?.length;
        const nextPage = allPages?.length + 1;
        return maxPage ? nextPage : undefined;
      },
      initialData: { pages: [initialComments], pageParams: [1] },
    });

  const comments = data?.pages?.flatMap((page) => page) ?? initialComments;

  console.log(comments);

  return (
    <>
      <div className="mt-2 pl-4 pr-1 overflow-auto">
        <div className="text-end py-2">
          <p className="text-neutral-300 text-sm font-medium">
            <span className="px-2 cursor-pointer">Top comments</span>
          </p>
        </div>
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment, index) => (
            <div className="flex flex-col" key={index}>
              <CommentSectionCard
                comment={topLevelComment}
                session={session}
                index={index}
                getComments={getComments}
                refetch={refetch}
                postId={postId}
              />

              {topLevelComment.replies.map((reply) => {
                {
                  console.log(reply);
                }
                return (
                  <div
                    key={reply.id}
                    className="ml-4 mb-5  pl-4  border-l border-neutral-600"
                  >
                    <CommentSectionCard
                      comment={reply}
                      session={session}
                      index={index}
                      getComments={getComments}
                      refetch={refetch}
                      postId={postId}
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </div>

      {hasNextPage && (
        <Button
          variant="ghost"
          className="text-white hover:underline hover:bg-neutral-800 focus:ring-0 focus:outline-none"
          onClick={() => fetchNextPage()}
        >
          {comments.length < COMMENT_PAGE - 1 ? "" : "View more comments"}
        </Button>
      )}

      {session?.user && (
        <div
          className={`fixed bottom-0 ${
            pathname.startsWith("/postComment") ? "w-[25vw]" : "w-full"
          }`}
        >
          <CreateComment
            session={session}
            postId={postId}
            getComments={getComments}
            refetch={refetch}
          />
        </div>
      )}
    </>
  );
};

export default CommentSection;
