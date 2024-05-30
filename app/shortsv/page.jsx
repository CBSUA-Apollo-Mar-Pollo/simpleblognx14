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

  let shortsvLength = shortsVideo.length;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  let num = getRandomInt(1, shortsvLength);

  const session = await getAuthSession();
  // get comments
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo[num].id,
      shortsvId: shortsVideo[num].id,
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
        video={shortsVideo[num]}
        comments={comments}
        session={session}
      />
    </div>
  );
};

export default shortsVPage;
