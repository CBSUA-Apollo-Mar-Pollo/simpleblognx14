"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import UserAvatar from "@/components/utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Dot, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SharedPostCard = ({ sharedPost, blog }) => {
  const { data: dominantColorSharedPost } = useQuery({
    queryKey: ["dominantColorSharedPost", sharedPost?.image],
    queryFn: async () => {
      const res = await getDominantColor(sharedPost?.image);
      return res;
    },
  });
  return (
    <div className=" mx-5 mb-2">
      <p className="px-1 text-justify text-base leading-relaxed mb-1 font-medium">
        {blog.description}
      </p>
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700">
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
              className="object-contain w-full transition max-h-[30rem] rounded-t-2xl "
              style={{
                backgroundColor: `rgb(${dominantColorSharedPost?.[0]}, ${dominantColorSharedPost?.[1]}, ${dominantColorSharedPost?.[2]})`,
              }}
            />
          </Link>
        )}
        {/* shared post description */}
        <div className=" gap-1 my-2 mx-4">
          {/* profile image  */}
          <Link href={`/user/${sharedPost?.author.id}`}>
            <div className="flex items-center gap-1">
              <UserAvatar
                post="post"
                className="h-9 w-9 "
                user={{
                  handleName: sharedPost.author?.handleName,
                  bio: sharedPost.author?.bio,
                  birthdate: sharedPost.author?.birthdate,
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
  );
};

export default SharedPostCard;
