import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import Image from "next/image";
import { Separator } from "../ui/Separator";
import { Button } from "../ui/Button";
import Link from "next/link";
import ClearButton from "./ClearButton";

const RecentPostsCard = async () => {
  const session = await getAuthSession();

  const recentPosts = await db.RecentPosts.findMany({
    where: {
      authorId: session?.user.id,
    },
    include: {
      blog: {
        include: {
          author: true,
          comments: true, // Include the author of the blog
        },
      },
    },
  });

  const todayPosts = recentPosts.filter((recPosts) => {
    const recPostDate = new Date(recPosts.createdAt);
    const today = new Date();
    return recPostDate.getDate() === today.getDate();
  });

  // console.log(todayPosts[2].blog.image[0].url, "todays posts");

  return (
    <div>
      {session?.user && todayPosts.length !== 0 && (
        <div className="bg-white dark:bg-neutral-800 pt-1 rounded-md px-1">
          <div className="overflow-y-scroll max-h-[10rem] recenpostsContainer  dark:border border-neutral-800 mb-2 mx-1 px-2">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-light px-1 py-3 dark:text-neutral-200 mb-2">
                RECENT POSTS
              </h1>
              <ClearButton />
            </div>
            <div className=" mr-2">
              {todayPosts.map((post, index, arr) => {
                return (
                  <div
                    key={index}
                    className={`flex items-start justify-between w-full ${
                      arr.length - 1 === index ? "" : "border-b"
                    }   border-neutral-700 px-2 py-0 `}
                  >
                    {/* user profile */}
                    <div className="flex flex-col space-y-2 my-2">
                      <div className="flex items-center gap-x-2">
                        <UserAvatar
                          post="post"
                          className="h-8 w-8"
                          user={{
                            handleName: post.blog.author?.handleName,
                            bio: post.blog.author?.bio,
                            birthdate: post.blog.author?.birthdate,
                            name: post.blog.author?.name || null,
                            image: post.blog.author?.image || null,
                          }}
                        />
                        <p className="dark:text-neutral-200 text-neutral-950 text-xs font-base">
                          {post.blog.author.name}
                        </p>
                      </div>
                      <Link
                        href={`/postComment/${post.blog.id}`}
                        className="text-neutral-900 font-medium dark:text-neutral-200 text-sm hover:underline"
                      >
                        {post.blog.description}
                      </Link>
                    </div>

                    <div className="my-2 ">
                      {post?.blog?.image[0] && (
                        <Link href={`/postComment/${post.blog.id}`}>
                          <div className="relative w-24 h-24">
                            <Image
                              sizes="100vh"
                              width={0}
                              height={0}
                              src={post.blog.image[0].url}
                              alt="profile image"
                              referrerPolicy="no-referrer"
                              className="object-cover w-full h-full rounded-lg"
                            />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {session?.user && todayPosts.length !== 0 && (
        <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />
      )}
    </div>
  );
};

export default RecentPostsCard;
