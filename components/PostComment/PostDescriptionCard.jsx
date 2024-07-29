"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Dot, Forward, Globe, MessageCircle } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import PostVote from "../PostVote/PostVote";
import { useSession } from "next-auth/react";
import CommentSection from "./CommentSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import HeartVote from "../PostVote/HeartVote";
import MultipleImageRender from "../Post/multiple-image-render";

const PostDescriptionCard = ({ blog, sharedPost }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const { mutate: getComments } = useMutation({
    mutationFn: async () => {
      const payload = { postId: blog.id };
      const { data } = await axios.fetch(
        "/api/posts/postDescriptionComment",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      setComments(data);
    },
  });

  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });

  return (
    <Dialog onOpenChange={() => getComments()}>
      <DialogTrigger>
        <div className="flex items-center gap-2  px-10  py-3 rounded cursor-pointer">
          <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
          <span className=" font-medium text-sm">Comment</span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 min-w-[40rem] bg-neutral-50 dark:bg-neutral-800  border-none dark:text-neutral-50">
        <DialogHeader className="px-4 py-4 border-b-[1px] dark:border-neutral-600 ">
          <DialogTitle className="text-xl text-center font-semibold text-neutral-800 dark:text-white">
            {blog?.author.name.split(" ")[0]}&apos;s Post
          </DialogTitle>
        </DialogHeader>

        {/* user profile */}
        <div className="relative">
          <div className="custom-scrollbar  max-h-[80vh]">
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
            <div className="grid grid-cols-4 my-1 gap-x-2 border-y-[1px] border-neutral-300  dark:border-neutral-600">
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
            <div className={`w-full ${session?.user ? "mb-[15vh]" : "mb-5"} `}>
              <CommentSection
                session={session}
                post={blog}
                initialComments={comments}
                getComments={getComments}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDescriptionCard;
