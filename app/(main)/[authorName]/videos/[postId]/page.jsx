import UserVideoDetailPage from "@/components/PostComment/user-video-detail-page";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const UsersVideoPage = async ({ params }) => {
  const session = await getAuthSession();
  const { authorName, postId } = params;
  const post = await db.blog.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
      replyToId: null,
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <UserVideoDetailPage post={post} comments={comments} session={session} />
  );
};

export default UsersVideoPage;
