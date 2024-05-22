"use client";

import UserAvatar from "@/components/utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Dot, Globe, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import PostOption from "../PostOption";

const PostCardHeader = ({ blog, session }) => {
  return (
    <div className="flex items-center justify-between gap-1 pl-5">
      {/* profile image  */}
      <Link href={`/user/${blog?.author.id}`}>
        <div className="flex items-center gap-1">
          <UserAvatar
            post="post"
            className="h-10 w-10 "
            user={{
              handleName: blog.author?.handleName,
              bio: blog.author?.bio,
              birthdate: blog.author?.birthdate,
              name: blog.author?.name || null,
              image: blog.author?.image || null,
            }}
          />

          <div className="px-2 pt-1">
            <p className="font-semibold text-sm">{blog?.author?.name}</p>
            <div className="flex items-center ">
              <p className=" text-xs text-gray-600 dark:text-neutral-200">
                {formatTimeToNow(new Date(blog?.createdAt))}
              </p>
              <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
              <Globe className="h-3 w-3 text-gray-600 dark:text-neutral-200" />
            </div>
          </div>
        </div>
      </Link>
      {/* option */}
      {session?.user && (
        <div className="flex items-center gap-x-1 pr-4">
          <PostOption authorId={blog.author.id} authorName={blog.author.name} />
          {session?.user?.id !== blog.author.id && (
            <X className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 h-10 w-10 rounded-full cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
};

export default PostCardHeader;
