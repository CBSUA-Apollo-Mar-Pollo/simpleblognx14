import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import HomePageLayout from "@/components/utils/home-page-layout";
import { unstable_cache } from "next/cache"; // 1. Import unstable_cache
import { UTApi } from "uploadthing/server";

export const metadata = {
  title: `Estorya | Home`,
};

const getHomePageData = unstable_cache(
  async () => {
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

      // Short Video Posts
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

      // Communities
      db.community.findMany({
        include: { members: { select: { userId: true } } },
      }),
    ]);

    // Perform the necessary data manipulation/merging here
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
  },
  ["homepage-feed"], // Cache Key
  { revalidate: 300 } // Revalidate every 5 minutes (300 seconds)
);

export default async function HomePage() {
  // 3. Call the cached function
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
