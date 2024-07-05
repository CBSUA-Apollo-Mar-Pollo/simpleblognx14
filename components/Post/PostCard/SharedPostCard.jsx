"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import UserAvatar from "@/components/utils/UserAvatar";
import { cn, formatTimeToNow } from "@/lib/utils";
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
          <div className="w-full">
            {/* render the this post when the user change his/her cover photo */}
            {sharedPost.userStatus && (
              <Link
                onClick={() => storeToRecentPosts(sharedPost.id)}
                href={`/postComment/${sharedPost.id}/${0}`}
                className="relative overflow-clip w-full flex flex-col"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  priority="true"
                  src={sharedPost.image.url}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-full transition max-h-[30rem] bg-neutral-700 rounded-t-2xl"
                />
              </Link>
            )}

            {/* render any of this image that meet the requirement */}

            {/* render if it has 1 image */}
            {sharedPost.image.length === 1 && (
              <Link
                onClick={() => storeToRecentPosts(sharedPost.id)}
                href={`/postComment/${sharedPost.id}/${0}`}
                className="relative overflow-clip w-full flex flex-col"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  priority="true"
                  src={sharedPost.image[0].url}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-full transition max-h-[30rem] bg-neutral-700 rounded-t-xl"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.5) 0%, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.8) 100%)`,
                  }}
                />
              </Link>
            )}

            {/* render if there are 2 image */}
            {sharedPost.image.length === 2 && (
              <div
                onClick={() => storeToRecentPosts(sharedPost.id)}
                className={`${
                  sharedPost.image.length === 2 && "grid grid-cols-2 gap-x-1"
                }`}
              >
                {sharedPost.image.map((imageUrl, index) => (
                  <Link
                    href={`/postComment/${sharedPost.id}/${index}`}
                    key={index}
                    className="relative hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={imageUrl.url}
                      alt="profile image"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "6  /10" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                ))}
              </div>
            )}

            {/* render if there are 3 image */}
            {sharedPost.image.length === 3 && (
              <div
                onClick={() => storeToRecentPosts(sharedPost.id)}
                className={`${
                  sharedPost.image.length === 3 && "grid grid-cols-8 gap-x-1"
                }`}
              >
                <Link
                  href={`/postComment/${sharedPost.id}/${0}`}
                  className="relative col-span-5 hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={sharedPost.image[0].url}
                    alt="profile image"
                    className="w-full h-auto object-cover  rounded-tl-xl"
                    style={{ aspectRatio: "14/17" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <div className=" flex flex-col  col-span-3">
                  {sharedPost.image.map((imageUrl, index) => {
                    if (index === 0) {
                      return null;
                    }

                    return (
                      <Link
                        href={`/postComment/${sharedPost.id}/${index}`}
                        key={index}
                        className="relative hover:opacity-80"
                      >
                        <Image
                          src={imageUrl.url}
                          sizes="100vw"
                          width={0}
                          height={0}
                          alt="profile image"
                          className={cn(
                            "w-full h-auto object-cover ",
                            index === 1 && "rounded-tr-xl mb-1"
                          )}
                          style={{ aspectRatio: "13/13" }} // Example aspect ratio (adjust as needed)
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* render if there are 4 image */}
            {sharedPost.image.length === 4 && (
              <div
                onClick={() => storeToRecentPosts(sharedPost.id)}
                className="flex flex-col"
              >
                <div className="relative grid grid-cols-2 gap-x-[2px]">
                  <Link
                    href={`/postComment/${sharedPost.id}/${0}`}
                    className="hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[0].url}
                      alt="profile image"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                  <Link
                    href={`/postComment/${sharedPost.id}/${1}`}
                    className="hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[1].url}
                      alt="profile image"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                </div>
                <div className="mt-[2px] grid grid-cols-2">
                  {sharedPost.image.map((imageUrl, index) => {
                    if (index === 0) {
                      return null;
                    }

                    if (index === 1) {
                      return null;
                    }

                    return (
                      <Link
                        href={`/postComment/${sharedPost.id}/${index}`}
                        key={index}
                        className="relative hover:opacity-80"
                      >
                        <Image
                          sizes="100vw"
                          width={0}
                          height={0}
                          src={imageUrl.url}
                          alt="profile image"
                          className="w-full h-auto object-cover px-[1px]"
                          style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* render if there are 5 image */}
            {sharedPost.image.length === 5 && (
              <div
                onClick={() => storeToRecentPosts(sharedPost.id)}
                className="flex flex-col"
              >
                <div className="relative grid grid-cols-2 gap-x-[2px]">
                  <Link
                    href={`/postComment/${sharedPost.id}/${0}`}
                    className="relative hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[0].url}
                      alt="profile image"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                  <Link
                    href={`/postComment/${sharedPost.id}/${1}`}
                    className="relative hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[1].url}
                      alt="profile image"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                </div>
                <div className="mt-[2px] grid grid-cols-3">
                  {sharedPost.image.map((imageUrl, index) => {
                    if (index === 0) {
                      return null;
                    }

                    if (index === 1) {
                      return null;
                    }

                    return (
                      <Link
                        href={`/postComment/${sharedPost.id}/${index}`}
                        key={index}
                        className="relative hover:opacity-80"
                      >
                        <Image
                          sizes="100vw"
                          width={0}
                          height={0}
                          src={imageUrl.url}
                          alt="profile image"
                          className="w-full h-auto object-cover px-[1px]"
                          style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* render if there are 6 or more image */}
            {sharedPost.image.length >= 6 && (
              <div
                onClick={() => storeToRecentPosts(sharedPost.id)}
                className=" flex flex-col"
              >
                <div className="relative grid grid-cols-2 gap-x-[1px] px-[1px]">
                  <Link
                    href={`/postComment/${sharedPost.id}/${0}`}
                    className="relative hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[0].url}
                      alt="profile image"
                      className="w-full h-auto object-cover rounded-tl-2xl"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                  <Link
                    href={`/postComment/${sharedPost.id}/${1}`}
                    className="relative hover:opacity-80"
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={sharedPost.image[1].url}
                      alt="profile image"
                      className="w-full h-auto object-cover rounded-tr-2xl"
                      style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                    />
                  </Link>
                </div>
                <div className="mt-[2px] grid grid-cols-3">
                  {sharedPost.image.map((imageUrl, index) => {
                    if (index === 0) {
                      return null;
                    }

                    if (index === 1) {
                      return null;
                    }

                    if (index >= 5) {
                      return null;
                    }

                    return (
                      <Link
                        href={`/postComment/${sharedPost.id}/${index}`}
                        key={index}
                        className="relative hover:opacity-80"
                      >
                        <Image
                          sizes="100vw"
                          width={0}
                          height={0}
                          src={imageUrl.url}
                          alt="profile image"
                          className={`w-full h-auto object-cover px-[1px] ${
                            index === 4 && "opacity-50"
                          }`}
                          style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                        />
                        {index === 4 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[3em] text-neutral-800 dark:text-neutral-50">
                            +
                            {sharedPost.image.length > 5 &&
                              sharedPost.image.length - 5}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* the shared post description */}
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

          <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
            {sharedPost.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SharedPostCard;
