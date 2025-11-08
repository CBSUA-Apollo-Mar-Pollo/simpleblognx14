import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: `Estorya | Shortsv`,
  description: "All in one social media app",
};

const shortsVPage = async () => {
  // Get all video IDs
  const shortsVideoIds = await db.shortsv.findMany({
    select: {
      id: true,
    },
  });

  // Ensure we have IDs to work with
  if (shortsVideoIds.length === 0) {
    // Handle case when there are no video IDs
    return redirect("/shorstv/create");
  }

  // Function to get a random index
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Pick a random ID
  const randomIndex = getRandomInt(0, shortsVideoIds.length);

  const randomSecondIndex = getRandomInt(0, shortsVideoIds.length); // for shortsvideo id

  const randomVideoId = shortsVideoIds[randomIndex]?.id;

  // Fetch the details for the selected random video
  const shortsVideo = await db.shortsv.findUnique({
    where: { id: randomVideoId },
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
    },
  });

  // Get comments for the selected video
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo.id,
      shortsvId: shortsVideo.id,
      replyToId: null,
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

  // Get the current user's session
  const session = await getAuthSession();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <ShortsvCard
        video={shortsVideo}
        comments={comments}
        nextLink={shortsVideoIds[randomSecondIndex]?.id}
      />
    </div>
  );
};

export default shortsVPage;
