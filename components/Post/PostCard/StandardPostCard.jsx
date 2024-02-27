"use client";

import { getDominantColor } from "@/actions/getDominantColor";
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
      <p className="px-7 text-justify leading-relaxed mb-1 font-medium">
        {blog.description}
      </p>
      {blog.image &&
        (isLoading ? (
          <PostCardLoader />
        ) : (
          <Link
            href={`/postComment/${blog.id}`}
            className="relative overflow-clip w-full "

            // ref={pRef}
          >
            <Image
              sizes="100vw"
              width={0}
              height={0}
              src={blog.image}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="object-contain w-full transition max-h-[30rem]"
              style={{
                backgroundColor: `rgb(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]})`,
              }}
            />
          </Link>
        ))}
    </>
  );
};

export default StandardPostCard;
