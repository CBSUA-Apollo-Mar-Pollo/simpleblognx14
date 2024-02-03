"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Dot, Forward, Globe, MessageCircle } from "lucide-react";
import { Separator } from "./ui/Separator";
import UserAvatar from "./UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import PostVote from "./post-vote/PostVote";

const PostDescriptionCard = ({ blog }) => {
  console.log(blog);
  return (
    <Dialog className="w-fit">
      <DialogTrigger>
        <MessageCircle className="h-6 w-6" />
        <span className=" font-medium text-sm">Comment</span>
      </DialogTrigger>

      <DialogContent className="py-2 px-4">
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl text-center font-bold">
            Create post
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="flex items-center gap-1">
          <UserAvatar
            className="h-10 w-10 "
            user={{
              name: blog.author?.name || null,
              image: blog.author?.image || null,
            }}
          />

          <div className="px-2 pt-1">
            <p className="font-semibold text-sm">{blog.author?.name}</p>
            <div className="flex items-center">
              <p className=" text-xs text-gray-600 ">
                {formatTimeToNow(new Date(blog?.createdAt))}
              </p>
              <Dot className="-mx-1 text-gray-600" />
              <Globe className="h-3 w-3 text-gray-600" />
            </div>
          </div>
        </div>
        <p className="px-3 text-justify leading-relaxed mb-1 font-medium">
          {blog.description}
        </p>

        {blog.comments.length !== 0 && (
          <div className="py-3 flex items-center justify-end mr-4 text-sm hover:underline">
            {blog.comments.length}{" "}
            {blog.comments.length === 1 ? "Comment" : "Comments"}
          </div>
        )}

        {/* home post vote comment and share */}
        <div className="flex justify-between my-1 gap-x-2 mx-3 ">
          {/* vote */}
          <div className="flex items-center gap-2  py-1 rounded cursor-pointer">
            <PostVote />
          </div>

          {/* comment button */}
          <div className="flex items-center gap-2 hover:bg-gray-200  py-1 rounded cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className=" font-medium text-sm">Comment</span>
          </div>

          {/* share */}
          <div className="flex items-center gap-2 hover:bg-gray-200  py-1 rounded cursor-pointer">
            <Forward className="h-6 w-6" />
            <span className=" font-medium text-sm">Share</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDescriptionCard;
