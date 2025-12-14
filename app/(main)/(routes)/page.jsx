import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import HomePageLayout from "@/components/utils/home-page-layout";
import { UTApi } from "uploadthing/server";
import { cache } from "react";

export const metadata = {
  title: `Estorya | Home`,
};

const getHomePageData = cache(async () => {
  const [posts, shortVideos, communities] = await Promise.all([
    db.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        votes: { select: { userId: true, type: true } },
        community: { include: { members: { select: { userId: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),

    db.shortsv.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        shortsvVotes: { select: { userId: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),

    db.community.findMany({
      include: { members: { select: { userId: true } } },
    }),
  ]);

  const updatedShortVideos = shortVideos.map((item) => ({
    ...item,
    isShortsV: true,
  }));

  const normalizedPosts = posts.map((p) => ({
    ...p,
    createdAtMs: new Date(p.createdAt).getTime(),
  }));
  const normalizedShorts = updatedShortVideos.map((p) => ({
    ...p,
    createdAtMs: new Date(p.createdAt).getTime(),
  }));
  const mergeData = [...normalizedPosts, ...normalizedShorts];

  const sortedData = mergeData.sort((a, b) => b.createdAtMs - a.createdAtMs);

  return { sortedData, communities };
});

export default async function HomePage() {
  const { sortedData, communities } = await getHomePageData();

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  };

  return (
    <HomePageLayout
      sortedData={sortedData}
      deleteImage={deleteImage}
      communities={communities}
    />
  );
}
