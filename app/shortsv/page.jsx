import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const shortsVPage = async () => {
  const shortsVideo = await db.shortsv.findMany({
    take: 1,
    include: {
      author: true,
      comments: true,
    },
  });

  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo[0].id,
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
    <ShortsvCard video={shortsVideo[0]} comments={comments} session={session} />
  );
};

export default shortsVPage;
