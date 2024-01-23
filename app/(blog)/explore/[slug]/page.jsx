import Blogs from "@/components/Blogs";
import { db } from "@/lib/db";
import React from "react";

const explore = async () => {
  const blogs = await db.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mt-[100px]">
      <Blogs blogs={blogs} />
    </div>
  );
};

export default explore;
