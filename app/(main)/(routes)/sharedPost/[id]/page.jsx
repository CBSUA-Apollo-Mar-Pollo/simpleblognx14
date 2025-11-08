import PostCard from "@/components/Post/PostCard/PostCard";
import { db } from "@/lib/db";
import React from "react";

const SharedPostPage = async ({ params }) => {
  const sharedPost = await db.blog.findMany({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: {
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
        },
      },
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="my-5 mx-[30rem]">
      <PostCard blog={sharedPost[0]} />
    </div>
  );
};

export default SharedPostPage;
