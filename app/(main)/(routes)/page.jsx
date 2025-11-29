import { db } from "@/lib/db";
// session is handled client-side in HomePageLayout with `useSession`
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { UTApi } from "uploadthing/server";
import HomePageLayout from "@/components/utils/home-page-layout";

export const metadata = {
  title: `Estorya | Home`,
};

export default async function HomePage() {
  // fetch posts, short videos and communities in parallel to reduce latency
  const [posts, shortVideos, communities] = await Promise.all([
    db.blog.findMany({
      include: {
        author: {
          // only request author fields that are used in the UI to avoid overfetching
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        // comments: only need ids so components can show counts without loading full comment objects
        comments: { select: { id: true } },
        // select only fields required for computing votes on the client
        votes: { select: { userId: true, type: true } },
        // community members: we only need userId to compute membership
        community: { include: { members: { select: { userId: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),

    // short video posts
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
        shortsVotes: { select: { userId: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),
    db.community.findMany({
      include: { members: { select: { userId: true } } },
    }),
  ]);

  // add an isShortsV flag for shorts
  const updatedShortVideos = shortVideos.map((item) => ({
    ...item,
    isShortsV: true,
  }));

  // attach numeric timestamp to optimize JS sort and avoid creating Date objects repeatedly
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

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  };

  // Conversation list is fetched client-side inside `HomePageLayout` via `getContactList`.
  // Avoid server-side fetching of conversations here since it's not used by the server-rendered UI and increases latency.
  const conversationList = null;

  // communities were fetched in parallel above; keep their reference.
  // we only included members.userId to reduce payloads.

  //
  return (
    <HomePageLayout
      sortedData={sortedData}
      deleteImage={deleteImage}
      communities={communities}
    />
  );
}
