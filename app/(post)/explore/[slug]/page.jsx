import Blogs from "@/components/Post/Posts";
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
    <div className="">
      <Blogs blogs={blogs} />
    </div>
  );
};

export default explore;
