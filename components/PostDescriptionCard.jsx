"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Dot, Forward, Globe, MessageCircle } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import PostVote from "./post-vote/PostVote";
import { useSession } from "next-auth/react";
import CommentSection from "./postComment/CommentSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostDescriptionCard = ({ blog }) => {
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
  });

  return (
    <Dialog onOpenChange={() => getComments()}>
      <DialogTrigger>
        <div className="flex items-center gap-2 hover:bg-gray-200 px-10  py-3 rounded cursor-pointer">
          <MessageCircle className="h-6 w-6" />
          <span className=" font-medium text-sm">Comment</span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 min-w-[45rem] bg-neutral-800 text-white border-none">
        <DialogHeader className="px-4 py-4 border-b-[1px] border-neutral-600">
          <DialogTitle className="text-xl text-center font-semibold text-white">
            {blog?.author.name.split(" ")[0]}&apos;s Post
          </DialogTitle>
        </DialogHeader>

        {/* user profile */}
        <div className="overflow-auto max-h-[80vh]">
          <div className="flex items-center gap-1 px-5 ">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: blog?.author?.name || null,
                image: blog?.author?.image || null,
              }}
            />

            <div className="px-2 pt-1 ">
              <p className="font-semibold text-sm">{blog.author?.name}</p>
              <div className="flex items-center">
                <p className=" text-xs  ">
                  {formatTimeToNow(new Date(blog?.createdAt))}
                </p>
                <Dot className="-mx-1 " />
                <Globe className="h-3 w-3 " />
              </div>
            </div>
          </div>

          {/* post description */}
          <p className="px-6 py-2 text-justify leading-relaxed mb-1 font-medium">
            {blog.description}
          </p>

          {blog.comments.length !== 0 && (
            <div className="py-3 flex items-center justify-end mr-4 text-sm hover:underline">
              {blog.comments.length}{" "}
              {blog.comments.length === 1 ? "Comment" : "Comments"}
            </div>
          )}

          {/* home post vote comment and share */}
          <div className="flex justify-between my-1 gap-x-2 px-10 border-y-[1px]  py-2 border-neutral-600">
            {/* vote */}
            <div className="flex items-center gap-2  rounded cursor-pointer">
              <PostVote />
            </div>

            {/* comment button */}
            <div className="flex items-center gap-2 hover:bg-neutral-500 px-5 rounded cursor-pointer">
              <MessageCircle className="h-6 w-6" />
              <span className=" font-medium text-sm">Comment</span>
            </div>

            {/* share */}
            <div className="flex items-center gap-2 hover:bg-neutral-500 px-5  rounded cursor-pointer">
              <Forward className="h-6 w-6" />
              <span className=" font-medium text-sm">Share</span>
            </div>
          </div>

          {/* comment section */}
          <div className={`w-full ${session?.user ? "mb-[15vh]" : "mb-5"} `}>
            <CommentSection
              session={session}
              postId={blog.id}
              initialComments={comments}
              getComments={getComments}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDescriptionCard;
