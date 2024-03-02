import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const shortsVPage = async () => {
  // get videos
  const shortsVideo = await db.shortsv.findMany({
    include: {
      author: true,
      comments: true,
    },
  });

  const session = await getAuthSession();
  // get comments
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo[7].id,
      shortsvId: shortsVideo[7].id,
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
    <ShortsvCard video={shortsVideo[7]} comments={comments} session={session} />
  );
};

export default shortsVPage;
