"use client";

import {
  Dot,
  Forward,
  Globe,
  Grip,
  MessageCircle,
  MoreHorizontal,
  Scaling,
  ThumbsUp,
  X,
} from "lucide-react";
import React from "react";
import CommentSection from "./CommentSection";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";
import UserAccountNav from "./UserAccountNav";
import { Separator } from "./ui/Separator";
import { cn, formatTimeToNow } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { buttonVariants } from "./ui/Button";

const PostCommentCard = ({ post, session }) => {
  const router = useRouter();
  const close = () => {
    router.back();
  };

  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
        <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
          {/* close button and logo */}
          <div className="flex items-center justify-center gap-2">
            <div
              className="py-2 px-2 cursor-pointer hover:bg-gray-800 rounded-full transition"
              onClick={close}
            >
              <X className="w-7 h-7 text-white" />
            </div>
            <Link href="/" className="font-bold">
              <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
                E
              </span>
            </Link>
          </div>
          {/* enter fullscreen */}
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-800 rounded-full transition">
            <Scaling className="text-white" />
          </div>
        </div>
        <Image
          sizes="100vw"
          width={0}
          height={0}
          src={post.image}
          alt="profile image"
          referrerPolicy="no-referrer"
          className="object-contain w-auto transition max-h-screen"
        />
      </div>
      <div className="col-span-1 bg-neutral-900">
        <div className="flex justify-end py-2 pr-4">
          {session ? (
            <div className="flex items-center gap-x-3">
              <div className=" bg-zinc-600 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                <Grip className="text-white " />
              </div>
              <div className="bg-zinc-600 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                <Icons.bell className=" text-white " />
              </div>
              <UserAccountNav user={session.user} />
            </div>
          ) : (
            <Link
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "text-white"
              )}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>

        <Separator className="bg-gray-700" />

        <div className="my-2 mx-3">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center">
              <UserAvatar
                className="h-10 w-10 "
                user={{
                  name: post.author?.name || null,
                  image: post.author?.image || null,
                }}
              />

              <div className="px-2 pt-1 text-white">
                <p className="font-semibold text-sm">{post.author?.name}</p>
                <div className="flex items-center">
                  <p className=" text-xs text-gray-200 ">
                    {formatTimeToNow(new Date(post?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-gray-200" />
                  <Globe className="h-3 w-3 text-gray-200" />
                </div>
              </div>
            </div>

            <div className="hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
              <MoreHorizontal className="text-white" />
            </div>
          </div>

          <div className="text-white my-2 mb-5">
            <p className="text-sm">{post.description}</p>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex justify-center text-neutral-300 my-1">
          <div className="flex items-center gap-2 px-5 hover:bg-gray-600  rounded cursor-pointer py-2">
            <ThumbsUp className="h-6 w-6" />
            <span className="pt-1 font-medium text-sm">Like</span>
          </div>
          <div className="flex items-center gap-2 px-5 hover:bg-gray-600   rounded cursor-pointer py-2">
            <MessageCircle className="h-6 w-6" />
            <span className=" font-medium text-sm">Comment</span>
          </div>
          <div className="flex items-center gap-2 px-5 hover:bg-gray-600   rounded cursor-pointer py-2">
            <Forward className="h-6 w-6" />
            <span className=" font-medium text-sm">Share</span>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        <CommentSection session={session} />
      </div>
    </div>
  );
};

export default PostCommentCard;
