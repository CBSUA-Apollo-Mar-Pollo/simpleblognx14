"use client";

import UserAvatar from "@/components/utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Dot, Globe, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PostOption from "../PostOption";
import { useRouter } from "next/navigation";
import useCustomHooks from "@/hooks/use-custom-hooks";
import { Icons } from "@/components/utils/Icons";

const PostCardHeader = ({ blog, session, deleteImage, fetchNextPage }) => {
  const router = useRouter();
  const { signinToast } = useCustomHooks();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigateCommunity = (event) => {
    if (!session?.user.id) {
      return signinToast();
    }

    return router.push(`/communities/${blog.community.id}`);
  };

  const handleNavigateUser = (event) => {
    // Stop the click event from bubbling up to the parent (which would trigger the community navigate)
    event.stopPropagation();
    return router.push(`/user/${blog?.author.id}`);
  };

  return (
    <div className="flex items-center justify-between gap-1 pl-5 py-0">
      {/* profile image  */}
      {blog.communityId ? (
        // community and user profile
        <div className="flex items-center">
          <UserAvatar
            post="post"
            className="h-10 w-10 hover:bg-slate-100"
            user={{
              image: blog.community?.icon || null,
            }}
          />
          <div
            onClick={() => handleNavigateCommunity()}
            className="hover:cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <div className="px-2 pt-1">
                <div className="flex items-center gap-x-1">
                  <p className="font-semibold text-[17px] hover:underline">
                    {blog?.community?.name}
                  </p>
                  {blog.userStatus && (
                    <span className="text-[13px] font-light">
                      {blog.userStatus}
                    </span>
                  )}
                </div>
                <div className="flex items-center -mt-[7px]">
                  <p
                    onClick={(event) => handleNavigateUser(event)}
                    className="font-medium text-neutral-700 hover:underline text-[12.5px] dark:text-neutral-200"
                  >
                    u/{blog?.author?.name}
                  </p>
                  <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                  <p className=" text-xs text-gray-600 dark:text-neutral-200">
                    {formatTimeToNow(new Date(blog?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                  <Icons.earthIcon className="h-3 w-3 text-gray-600  dark:fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // user normal post
        <div className="flex items-center gap-x-1">
          <UserAvatar
            post="post"
            className="h-10 w-10 hover:bg-slate-100"
            user={{
              id: blog?.author.id,
              handleName: blog.author?.handleName,
              bio: blog.author?.bio,
              birthdate: blog.author?.birthdate,
              name: blog.author?.name || null,
              image: blog.author?.image || null,
            }}
          />
          <Link href={`/user/${blog?.author.id}`}>
            <div className="flex items-center gap-1">
              <div className="px-2 pt-1">
                <div className="flex items-center gap-x-1">
                  <p className="font-semibold text-sm hover:underline text-[12px]">
                    {blog?.author?.name}
                  </p>
                  {blog.userStatus && (
                    <span className="text-[13px] font-light">
                      {blog.userStatus}
                    </span>
                  )}
                </div>
                <div className="flex items-center ">
                  <p className=" text-xs text-gray-600 dark:text-neutral-200">
                    {formatTimeToNow(new Date(blog?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                  <Icons.earthIcon className="h-3 w-3 text-gray-600  dark:fill-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* option */}
      {isMounted && session?.user && (
        <div className="flex items-center gap-x-1 pr-4">
          <PostOption
            blog={blog}
            deleteImage={deleteImage}
            fetchNextPage={fetchNextPage}
          />
          {session?.user?.id !== blog.author.id && (
            <X className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 h-10 w-10 rounded-full cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
};

export default PostCardHeader;
