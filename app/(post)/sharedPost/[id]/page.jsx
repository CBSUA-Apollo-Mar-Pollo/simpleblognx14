import PostCard from "@/components/Post/PostCard/PostCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const SharedPostPage = async ({ params }) => {
  const session = getAuthSession();
  const sharedPost = await db.blog.findMany({
    where: {
      id: params.id,
    },
    include: {
      author: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="my-5 mx-[30rem]">
      <PostCard session={session} blog={sharedPost[0]} />
    </div>
  );
};

export default SharedPostPage;
