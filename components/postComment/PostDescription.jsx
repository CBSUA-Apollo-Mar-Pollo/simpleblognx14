import React from "react";
import UserAvatar from "../UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Dot, Globe, MoreHorizontal } from "lucide-react";

const PostDescription = ({ post }) => {
  return (
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
  );
};

export default PostDescription;
