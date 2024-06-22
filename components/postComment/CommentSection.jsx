"use client";

import { useEffect } from "react";
import CreateComment from "./CreateComment";
import { usePathname } from "next/navigation";
import { COMMENT_PAGE } from "@/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import CommentSectionCard from "./CommentSectionCard";

const CommentSection = ({
  session,
  post,
  shortsvId,
  initialComments,
  getComments,
}) => {
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
    const query = `/api/posts/fetchNextComments?limit=${COMMENT_PAGE}&page=${pageParam}&postId=${post.id}`;

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

  return (
    <>
      <div className="mt-2 pl-4 pr-1 overflow-auto">
        <div className="text-end py-2">
          <p className="text-neutral-800 dark:text-neutral-300 text-sm font-medium">
            <span className="px-2 cursor-pointer">Top comments</span>
          </p>
        </div>
        {/* comments */}
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment, index) => {
            // const divRefs = Array(topLevelComment.replies.length)
            //   .fill(null)
            //   .map(() => useRef(null));
            return (
              <div className="flex flex-col relative" key={index}>
                {topLevelComment.replies.length !== 0 && (
                  <div
                    // className={`absolute left-4 border-l-2 border-neutral-600 h-[calc(100%-${
                    //   divRefs[divRefs.length - 1].current?.offsetHeight
                    // }px)] `}
                    className={`absolute left-4 border-l-2 border-neutral-600 h-[90%]`}
                  />
                )}
                <CommentSectionCard
                  comment={topLevelComment}
                  session={session}
                  index={index}
                  getComments={getComments}
                  refetch={refetch}
                  post={post}
                  shortsvId={shortsvId}
                />

                {/* replies */}
                {topLevelComment.replies.map((reply, index) => {
                  return (
                    <div
                      key={reply.id}
                      className="pl-4 relative"
                      // ref={divRefs[index]}
                    >
                      <div className="absolute left-4 rounded-es-2xl border-l-2 w-6 border-b-2 border-neutral-600 h-6" />
                      <div className="ml-8 mt-2">
                        <CommentSectionCard
                          comment={reply}
                          session={session}
                          index={index}
                          getComments={getComments}
                          refetch={refetch}
                          post={post}
                          shortsvId={shortsvId}
                          classNameForUserAvatarReplies="h-7 w-7"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
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
            pathname.startsWith("/postComment") ||
            pathname.startsWith("/shortsv")
              ? "w-[25vw]"
              : "w-full"
          }`}
        >
          <CreateComment
            session={session}
            postId={post.id}
            shortsvId={shortsvId}
            getComments={getComments}
            refetch={refetch}
          />
        </div>
      )}
    </>
  );
};

export default CommentSection;
