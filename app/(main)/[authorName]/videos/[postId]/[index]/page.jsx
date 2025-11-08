import UserVideoDetailPage from "@/components/PostComment/user-video-detail-page";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const UsersVideoPage = async ({ params }) => {
  const session = await getAuthSession();
  const { authorName, postId, index } = params;
  const post = await db.blog.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
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
      index: index,
    },
    include: {
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              blogs: true,
              id: true,
              type: true,
              name: true,
              bio: true,
              email: true,
              image: true,
              category: true,
              backgroundImage: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <UserVideoDetailPage post={post} comments={comments} index={index} />;
};

export default UsersVideoPage;
