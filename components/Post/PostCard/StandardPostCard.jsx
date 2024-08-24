"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MultipleImageRender from "../multiple-image-render";

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
      {blog.description && (
        <p className="px-5 text-justify leading-snug text-[15px] font-[12px] py-1">
          {blog.description}
        </p>
      )}

      <MultipleImageRender
        blog={blog}
        dominantColorPost={dominantColorPost}
        isLoading={isLoading}
      />
    </div>
  );
};

export default StandardPostCard;
