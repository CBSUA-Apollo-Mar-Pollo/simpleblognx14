"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import PostCardLoader from "@/components/Loaders/PostCardLoader";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StandardPostCard = ({ blog }) => {
  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image);
      return res;
    },
  });

  return (
    <>
      <p className="pl-5 text-justify leading-relaxed mb-3 font-medium  ">
        {blog.description}
      </p>
      {blog.image &&
        (isLoading ? (
          <PostCardLoader />
        ) : (
          <Link
            onClick={() => storeToRecentPosts(blog.id)}
            href={`/postComment/${blog.id}`}
            className="relative overflow-clip w-full"

            // ref={pRef}
          >
            <Image
              sizes="100vw"
              width={0}
              height={0}
              priority
              src={blog.image}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="object-contain w-full transition max-h-[30rem]"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.5) 0%, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.8) 100%)`,
              }}
            />
          </Link>
        ))}
    </>
  );
};

export default StandardPostCard;
