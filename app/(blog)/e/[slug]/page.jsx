import Blogs from "@/components/Blogs";
import { db } from "@/lib/db";
import React from "react";

const page = async () => {
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

export default page;
