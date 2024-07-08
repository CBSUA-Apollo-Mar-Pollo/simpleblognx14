"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StandardPostCard = ({ blog }) => {
  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });

  return (
    <div>
      <p className="px-5 text-justify leading-snug text-[15px] mb-1 font-[12px]">
        {blog.description}
      </p>
      {blog.image && (
        <div className="w-full">
          {/* render the this post when the user change his/her cover photo */}

          {/* render any of this image that meet the requirement */}
          {blog.userStatus === "updated his cover photo" && (
            <Link
              onClick={() => storeToRecentPosts(blog.id)}
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
            >
              <Image
                sizes="100vw"
                width={0}
                height={0}
                priority="true"
                src={blog.image.url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-full transition max-h-[30rem] bg-neutral-700"
              />
            </Link>
          )}

          {blog.image.length === 1 && blog.userStatus === "edited" && (
            <Link
              onClick={() => storeToRecentPosts(blog.id)}
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
            >
              <Image
                sizes="100vw"
                width={0}
                height={0}
                priority="true"
                src={blog.image[0].url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-full transition max-h-[30rem] bg-neutral-700"
              />
            </Link>
          )}

          {/* render if it has 1 image */}
          {blog.image.length === 1 && blog.userStatus === null && (
            <Link
              onClick={() => storeToRecentPosts(blog.id)}
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
            >
              <Image
                sizes="100vw"
                width={0}
                height={0}
                priority="true"
                src={blog.image[0].url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-full transition max-h-[30rem] bg-neutral-700"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.5) 0%, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.8) 100%)`,
                }}
              />
            </Link>
          )}

          {/* render if there are 2 image */}
          {blog.image.length === 2 && (
            <div
              onClick={() => storeToRecentPosts(blog.id)}
              className={`${
                blog.image.length === 2 && "grid grid-cols-2 gap-x-1"
              }`}
            >
              {blog.image.map((imageUrl, index) => (
                <Link
                  href={`/postComment/${blog.id}/${index}`}
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
          {blog.image.length === 3 && (
            <div
              onClick={() => storeToRecentPosts(blog.id)}
              className={`${
                blog.image.length === 3 && "grid grid-cols-8 gap-x-1"
              }`}
            >
              <Link
                href={`/postComment/${blog.id}/${0}`}
                className="relative col-span-5 hover:opacity-80"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={blog.image[0].url}
                  alt="profile image"
                  className="w-full h-auto object-cover my-1"
                  style={{ aspectRatio: "14/17" }} // Example aspect ratio (adjust as needed)
                />
              </Link>
              <div className="mt-[2px] flex flex-col  col-span-3">
                {blog.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return null;
                  }

                  return (
                    <Link
                      href={`/postComment/${blog.id}/${index}`}
                      key={index}
                      className="relative mt-[4px] hover:opacity-80"
                    >
                      <Image
                        src={imageUrl.url}
                        sizes="100vw"
                        width={0}
                        height={0}
                        alt="profile image"
                        className="w-full h-auto object-cover mt-[1px]"
                        style={{ aspectRatio: "13/13" }} // Example aspect ratio (adjust as needed)
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* render if there are 4 image */}
          {blog.image.length === 4 && (
            <div
              onClick={() => storeToRecentPosts(blog.id)}
              className="flex flex-col"
            >
              <div className="relative grid grid-cols-2 gap-x-[2px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[0].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <Link
                  href={`/postComment/${blog.id}/${1}`}
                  className="hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[1].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
              </div>
              <div className="mt-[2px] grid grid-cols-2">
                {blog.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return null;
                  }

                  if (index === 1) {
                    return null;
                  }

                  return (
                    <Link
                      href={`/postComment/${blog.id}/${index}`}
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
          {blog.image.length === 5 && (
            <div
              onClick={() => storeToRecentPosts(blog.id)}
              className="flex flex-col"
            >
              <div className="relative grid grid-cols-2 gap-x-[2px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[0].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <Link
                  href={`/postComment/${blog.id}/${1}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[1].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
              </div>
              <div className="mt-[2px] grid grid-cols-3">
                {blog.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return null;
                  }

                  if (index === 1) {
                    return null;
                  }

                  return (
                    <Link
                      href={`/postComment/${blog.id}/${index}`}
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
          {blog.image.length >= 6 && (
            <div
              onClick={() => storeToRecentPosts(blog.id)}
              className=" flex flex-col"
            >
              <div className="relative grid grid-cols-2 gap-x-[1px] px-[1px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[0].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <Link
                  href={`/postComment/${blog.id}/${1}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={blog.image[1].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
              </div>
              <div className="mt-[2px] grid grid-cols-3">
                {blog.image.map((imageUrl, index) => {
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
                      href={`/postComment/${blog.id}/${index}`}
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
                          +{blog.image.length > 5 && blog.image.length - 5}
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
    </div>
  );
};

export default StandardPostCard;
