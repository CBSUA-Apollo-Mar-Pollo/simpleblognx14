"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Dot, Forward, Globe, MessageCircle } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import PostVote from "../PostVote/PostVote";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import HeartVote from "../PostVote/HeartVote";
import MultipleImageRender from "../Post/multiple-image-render";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { usePathname } from "next/navigation";
import CreateComment from "./CreateComment";
import { COMMENT_PAGE } from "@/config";
import CommentSectionCard from "./CommentSectionCard";
import { Button } from "../ui/Button";

const PostDescriptionCard = ({ blog, sharedPost }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const { mutate: getComments } = useMutation({
    mutationFn: async () => {
      const payload = { postId: blog.id };
      const { data } = await axios.post(
        "/api/posts/postDescriptionComment",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      setComments(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    getComments();
  }, []);

  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });
  const fetchComments = async ({ pageParam = 1 }) => {
    const query = `/api/posts/fetchNextComments?limit=${COMMENT_PAGE}&page=${pageParam}&postId=${blog.id}`;
    const res = await fetch(query, { cache: "no-store" });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data;
  };

  const { data, fetchNextPage, refetch, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["viewMoreCommentsPostDescription", blog.id],
      queryFn: fetchComments,
      getNextPageParam: (lastPage, allPages) => {
        // Adjust the logic here based on your API's response
        if (lastPage.length === 0) {
          return undefined; // No more pages
        }
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  // Flatten the data from all pages
  const commentsData = data?.pages.flat() ?? [];

  return (
    <Dialog onOpenChange={() => getComments()}>
      <DialogTrigger>
        <div className="flex items-center gap-2  px-10  py-3 rounded cursor-pointer">
          <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
          <span className=" font-medium text-sm">Comment</span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 min-w-[40rem] gap-0 bg-neutral-50 dark:bg-neutral-800  border-none dark:text-neutral-50">
        <DialogHeader className="px-4 py-4  border-b-[1px] dark:border-neutral-600 ">
          <DialogTitle className="text-xl text-center font-semibold text-neutral-800 dark:text-white">
            {blog?.author.name.split(" ")[0]}&apos;s Post
          </DialogTitle>
        </DialogHeader>

        {/* user profile */}
        <div className="relative mt-2">
          <SimpleBar style={{ maxHeight: "60vh" }}>
            <div className="flex items-center gap-1 px-5 ">
              <UserAvatar
                className="h-10 w-10 "
                user={{
                  name: blog?.author?.name || null,
                  image: blog?.author?.image || null,
                }}
              />

              <div className="px-2 pt-1 ">
                <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                  {blog.author?.name}
                </p>
                <div className="flex items-center">
                  <p className=" text-xs  text-neutral-800 dark:text-neutral-50">
                    {formatTimeToNow(new Date(blog?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-neutral-800 dark:text-neutral-50" />
                  <Globe className="h-3 w-3 text-neutral-800 dark:text-neutral-50 " />
                </div>
              </div>
            </div>

            {/* post description */}
            <p className="px-6 py-2 text-justify text-base leading-relaxed mb-1 font-normal text-neutral-800 dark:text-neutral-50">
              {blog.description}
            </p>

            <MultipleImageRender
              blog={blog}
              dominantColorPost={dominantColorPost}
              isLoading={isLoading}
            />

            {sharedPost && (
              <div className=" mx-5 mb-2">
                <div className="rounded-2xl border border-neutral-600">
                  {sharedPost.image && (
                    <Link
                      href={`/postComment/${sharedPost.id}`}
                      className="relative overflow-clip w-full "
                      // ref={pRef}
                    >
                      <Image
                        sizes="100vw"
                        width={0}
                        height={0}
                        src={sharedPost.image}
                        alt="profile image"
                        referrerPolicy="no-referrer"
                        className="object-contain w-full transition max-h-[30rem] bg-black rounded-t-2xl "
                      />
                    </Link>
                  )}
                  {/* shared post description */}
                  <div className=" gap-1 my-2 mx-4">
                    {/* profile image  */}
                    <Link href={`/user/${sharedPost?.author.id}`}>
                      <div className="flex items-center gap-1">
                        <UserAvatar
                          className="h-9 w-9 "
                          user={{
                            name: sharedPost.author?.name || null,
                            image: sharedPost.author?.image || null,
                          }}
                        />

                        <div className="px-2 pt-1">
                          <p className="font-semibold text-sm">
                            {sharedPost?.author?.name}
                          </p>
                          <div className="flex items-center">
                            <p className=" text-xs text-gray-600 ">
                              {formatTimeToNow(new Date(sharedPost?.createdAt))}
                            </p>
                            <Dot className="-mx-1 text-gray-600" />
                            <Globe className="h-3 w-3 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                      {sharedPost.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {blog.comments.length !== 0 && (
              <div className="py-3 flex items-center justify-end mr-4 text-sm hover:underline">
                {blog.comments.length}{" "}
                {blog.comments.length === 1 ? "Comment" : "Comments"}
              </div>
            )}

            {/* home post vote comment and share */}
            <div className="grid grid-cols-4 gap-x-2 border-y-[1px] border-neutral-300  dark:border-neutral-600">
              {/* vote */}
              <PostVote />
              <HeartVote />
              {/* comment button */}
              <div className="flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 px-5 rounded cursor-pointer">
                <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                <span className=" font-medium text-sm dark:text-white">
                  Comment
                </span>
              </div>
              {/* share */}
              <div className="flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 px-5  rounded cursor-pointer">
                <Forward className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                <span className=" font-medium text-sm dark:text-neutral-200">
                  Share
                </span>
              </div>
            </div>

            {/* comment section */}
            <div className="mt-2 pl-4 pr-1 overflow-auto">
              <div className="text-end py-2">
                <p className="text-neutral-800 dark:text-neutral-300 text-sm font-medium">
                  <span className="px-2 cursor-pointer">Top comments</span>
                </p>
              </div>
              {/* comments */}
              {commentsData
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
                        post={blog}
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
                                post={blog}
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
                className="dark:text-white text-neutral-100 hover:underline hover:bg-neutral-800 dark:hover:text-neutral-300 focus:ring-0 focus:outline-none"
                onClick={() => fetchNextPage()}
              >
                {commentsData.length < COMMENT_PAGE - 1
                  ? ""
                  : "View more comments"}
              </Button>
            )}
          </SimpleBar>
        </div>

        {session?.user && (
          <div>
            <CreateComment
              session={session}
              postId={blog.id}
              getComments={getComments}
              refetch={refetch}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostDescriptionCard;
