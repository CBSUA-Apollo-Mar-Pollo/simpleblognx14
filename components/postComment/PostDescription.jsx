import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import {
  Dot,
  Globe,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

const PostDescription = ({ post, commentAmt, session, index }) => {
  return (
    <div className="my-2 mx-3">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-start">
          <UserAvatar
            className="h-10 w-10 mt-2"
            user={{
              name: post.author?.name || null,
              image: post.author?.image || null,
            }}
          />

          <div className="px-2 pt-1  text-neutral-700 dark:text-white">
            <div className="gap-x-1 flex items-center">
              <p className="font-semibold text-sm hover:underline text-[12px]">
                {post?.author?.name}
              </p>
              {post.userStatus && (
                <span className="text-[13px] font-light">
                  {post.userStatus}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <p className=" text-xs text-neutral-700 dark:text-neutral-200 ">
                {formatTimeToNow(new Date(post?.createdAt))}
              </p>
              <Dot className="-mx-1 text-neutral-700 dark:text-gray-200" />
              <Globe className="h-3 w-3 text-neutral-500 dark:text-gray-200" />
            </div>
          </div>
        </div>

        {session?.user && (
          <div className="hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
            <MoreHorizontal className="text-neutral-700 dark:text-white" />
          </div>
        )}
      </div>

      <div className="text-neutral-700 dark:text-neutral-200 my-2 mb-5">
        <p className="text-sm">
          {post.image.length === 1
            ? post.description
            : post.image[index].description}
        </p>
      </div>

      {commentAmt !== 0 && (
        <div className="flex items-center justify-end gap-x-1 text-neutral-700 dark:text-neutral-400">
          {commentAmt}
          <MessageCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default PostDescription;
