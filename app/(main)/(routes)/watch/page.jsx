import Posts from "@/components/Post/Posts";
import WatchPageSideBar from "@/components/watch/watch-page-sidebar";
import WatchPageSingleVideo from "@/components/watch/watch-page-single-video";
import WatchPageVideos from "@/components/watch/watch-page-videos";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import { unstable_cache as cache } from "next/cache";

const getVideosCached = cache(
  async () => {
    return db.post.findMany({
      where: {
        video: {
          not: null,
        },
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        votes: { select: { userId: true, type: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    });
  },
  ["latest-videos-feed"],
  {
    tags: ["blog-videos-list"],

    revalidate: 60,
  }
);

const getSingleVideo = async (searchQuery) => {
  if (!searchQuery) return null;

  return db.post.findFirst({
    where: {
      id: searchQuery,
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
      comments: {
        // Fetching only comment IDs is good for initial count/links
        select: { id: true },
      },
      votes: { select: { userId: true, type: true } },
    },
  });
};

const WatchPage = async ({ searchParams }) => {
  const searchQuery = searchParams?.v;

  const [session, videos, video] = await Promise.all([
    getAuthSession(),
    getVideosCached(),
    getSingleVideo(searchQuery),
  ]);

  if (searchQuery) {
    if (!video) {
      return <div>Video Not Found</div>;
    }

    return (
      <>
        <WatchPageSingleVideo video={video} />
      </>
    );
  }

  console.log(video, "video");

  if (!videos) {
    return <div>Error loading videos. Please try again.</div>;
  }

  return (
    <div className="grid grid-cols-10 ">
      <div className="col-span-2 border-r dark:bg-neutral-800 border-neutral-200 dark:border-neutral-800 relative">
        <WatchPageSideBar />
      </div>
      <div className="col-span-8 pt-5 bg-neutral-200 dark:bg-neutral-900 ">
        <WatchPageVideos initialVideos={videos} />
      </div>
    </div>
  );
};

export default WatchPage;
