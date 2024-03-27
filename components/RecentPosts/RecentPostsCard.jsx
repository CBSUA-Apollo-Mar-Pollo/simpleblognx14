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

  return (
    <>
      {session?.user && todayPosts.length !== 0 && (
        <div className="bg-white dark:bg-neutral-800 dark:border-0 border rounded-xl mr-4">
          <div className="flex items-center justify-between">
            <h1 className="text-md font-bold px-5 py-3 dark:text-neutral-200">
              RECENT POSTS
            </h1>
            <ClearButton />
          </div>
          <div className="overflow-auto max-h-[20rem] mr-2">
            {todayPosts.map((post, index, arr) => {
              return (
                <div
                  key={index}
                  className={`flex justify-between ${
                    arr.length - 1 === index ? "" : "border-b"
                  }   border-neutral-700 px-4 py-3`}
                >
                  {/* user profile */}
                  <div className="flex flex-col space-y-2">
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
                      className="text-neutral-900 font-medium dark:text-neutral-200 text-sm hover:underline w-[15vw]"
                    >
                      {post.blog.description}
                    </Link>
                  </div>

                  {post.blog.image && (
                    <Link
                      href={`/postComment/${post.blog.id}`}
                      className="mt-2"
                    >
                      <Image
                        sizes="6vw"
                        width={0}
                        height={0}
                        src={post.blog.image}
                        alt="profile image"
                        referrerPolicy="no-referrer"
                        className="object-contain w-auto transition rounded-md max-h-[10rem]"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentPostsCard;
