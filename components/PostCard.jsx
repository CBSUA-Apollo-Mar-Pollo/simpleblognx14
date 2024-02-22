"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { formatTimeToNow } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/Separator";
import {
  Dot,
  Forward,
  Globe,
  MessageCircle,
  MoreHorizontal,
  PenSquare,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import CommentSection from "./postComment/CommentSection";
import HeartVote from "./post-vote/HeartVote";
import Link from "next/link";
import PostDescriptionCard from "./PostDescriptionCard";
import PostOption from "./PostOption";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import { Button } from "./ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import axios, { AxiosError } from "axios";
import { getSharedPost } from "@/actions/getSharedPost";
import SharePostModal from "./SharePostModal";
// import { Button } from "./ui/Button";

const PostCard = ({ blog, session }) => {
  // console.log(blog);
  // const pRef = useRef(null);
  const { toast } = useToast();
  const { signinToast } = useCustomHooks();

  // share post function using useMutation from tanstack query
  const { mutate: sharePost, isLoading } = useMutation({
    mutationFn: async (id) => {
      const payload = {
        postId: id,
      };
      const { data } = await axios.post("/api/blog/sharePost", payload);
      return data;
    },
    onError: (err) => {
      //  if there are any other errors beside the server error

      if (err.response?.status === 401) {
        return signinToast();
      }

      if (err.response?.status === 500) {
        return toast({
          description: "Couldn't share post",
          variant: "destructive",
        });
      }

      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: async () => {},
  });

  const { data: sharedPost, error } = useQuery({
    // Query key (unique identifier)
    queryKey: ["sharedPost", blog.sharedPostId],
    // Query function
    queryFn: async () => {
      const res = await getSharedPost(blog.sharedPostId);
      return res;
    },
  });

  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex items-center justify-between gap-1">
          {/* profile image  */}
          <Link href={`/user/${blog?.author.id}`}>
            <div className="flex items-center gap-1">
              <UserAvatar
                className="h-10 w-10 "
                user={{
                  name: blog.author?.name || null,
                  image: blog.author?.image || null,
                }}
              />

              <div className="px-2 pt-1">
                <p className="font-semibold text-sm">{blog?.author?.name}</p>
                <div className="flex items-center">
                  <p className=" text-xs text-gray-600 ">
                    {formatTimeToNow(new Date(blog?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-gray-600" />
                  <Globe className="h-3 w-3 text-gray-600" />
                </div>
              </div>
            </div>
          </Link>
          {/* option */}
          {session?.user && (
            <PostOption
              authorId={blog.author.id}
              authorName={blog.author.name}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* post content */}
        {sharedPost ? (
          <div className=" mx-5 mb-2">
            <p className="px-1 text-justify text-base leading-relaxed mb-1 font-medium">
              {blog.description}
            </p>
            <div className="rounded-2xl border border-neutral-200">
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
        ) : (
          <>
            <p className="px-7 text-justify leading-relaxed mb-1 font-medium">
              {blog.description}
            </p>
            {blog.image && (
              <Link
                href={`/postComment/${blog.id}`}
                className="relative overflow-clip w-full"
                // ref={pRef}
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={blog.image}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-full transition max-h-[30rem] bg-black"
                />
                {/* {pRef.current?.clientHeight >= 600 ? (
                <div className="absolute bottom-0 left-0 h-16 w-full flex items-center justify-center">
                  <Button className="px-36 text-xs bg-opacity-90">
                    SEE FULL IMAGE
                  </Button>
                </div>
              ) : null} */}
              </Link>
            )}
          </>
        )}

        {blog.comments.length !== 0 &&
          (blog?.image ? (
            <Link
              href={`/postComment/${blog.id}`}
              className="py-3 flex items-center justify-end mr-4 text-sm hover:underline"
            >
              {blog.comments.length}{" "}
              {blog.comments.length === 1 ? "Comment" : "Comments"}
            </Link>
          ) : (
            <div className="py-3 flex items-center justify-end mr-4 text-sm hover:underline">
              {blog.comments.length}{" "}
              {blog.comments.length === 1 ? "Comment" : "Comments"}
            </div>
          ))}
        <Separator className="" />

        {/* home post vote comment and share */}
        <div className="flex justify-between my-1 gap-x-2 mx-6">
          {/* vote */}
          <div className="flex items-center gap-2 px-10 py-1 rounded cursor-pointer">
            <HeartVote />
          </div>
          {/* comment button */}
          {blog?.image ? (
            <Link
              href={`/postComment/${blog.id}`}
              className="flex items-center gap-2 hover:bg-gray-200 px-10 py-1 rounded cursor-pointer"
            >
              <MessageCircle className="h-6 w-6" />
              <span className=" font-medium text-sm">Comment</span>
            </Link>
          ) : (
            <PostDescriptionCard blog={blog} sharedPost={sharedPost} />
          )}

          {/* share */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-200 px-10 py-1 rounded cursor-pointer focus-visible:outline-none">
              <Forward className="h-6 w-6" />
              <span className=" font-medium text-sm">Share</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-[18vw]">
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  className="flex justify-start gap-x-3"
                  onClick={() => sharePost(blog.id)}
                >
                  <Forward className="h-6 w-6" />
                  <span>Share now</span>
                </Button>

                <SharePostModal
                  session={session}
                  sharedPost={sharedPost}
                  blog={blog}
                />

                <Button variant="ghost" className="flex justify-start gap-x-3">
                  <PlusCircle className="h-5 w-5" />
                  <span> Share to your story</span>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
