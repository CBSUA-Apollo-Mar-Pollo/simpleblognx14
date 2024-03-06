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
      postId: shortsVideo[8].id,
      shortsvId: shortsVideo[8].id,
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
    <div className="bg-neutral-950">
      <ShortsvCard
        video={shortsVideo[8]}
        comments={comments}
        session={session}
      />
    </div>
  );
};

export default shortsVPage;
