"use client";

import React from "react";
import MultipleImageRender from "../multiple-image-render";
import Link from "next/link";
import UserAvatar from "@/components/utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Dot, Globe } from "lucide-react";

const SharedPostEdit = ({ sharedPost }) => {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 pt-1 mt-2 mb-3 mr-1">
      <MultipleImageRender blog={sharedPost} />

      {/* the shared post description */}
      <div className=" gap-1 my-2 ml-1">
        {/* profile image  */}
        <Link href={`/user/${sharedPost?.author.id}`}>
          <div className="flex items-center gap-1">
            <UserAvatar
              post="post"
              className="h-10 w-10 "
              user={{
                handleName: sharedPost.author?.handleName,
                bio: sharedPost.author?.bio,
                birthdate: sharedPost.author?.birthdate,
                name: sharedPost.author?.name || null,
                image: sharedPost.author?.image || null,
              }}
            />

            <div className="px-2 pt-1">
              <div className="flex items-center gap-x-1">
                <p className="font-semibold text-sm">
                  {sharedPost?.author?.name}
                </p>
                {sharedPost?.userStatus && (
                  <span className="text-[13px] mt-[1px] font-light">
                    {sharedPost?.userStatus}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <p className=" text-xs text-gray-600 dark:text-neutral-200 ">
                  {formatTimeToNow(new Date(sharedPost?.createdAt))}
                </p>
                <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                <Globe className="h-3 w-3 text-gray-600 dark:text-neutral-200" />
              </div>
            </div>
          </div>
        </Link>

        {sharedPost?.description && (
          <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
            {sharedPost.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SharedPostEdit;
