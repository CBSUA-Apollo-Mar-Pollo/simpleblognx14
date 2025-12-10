import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import StickDiv from "@/components/UserProfile/sticky_div";
import UserAllPosts from "@/components/UserProfile/UserAllPosts";
import UserBio from "@/components/UserProfile/UserBio";
import UserPostCreationSection from "@/components/UserProfile/user-post-creation-section";
import UserPostsToolBar from "@/components/UserProfile/user-posts-toolbar";
import PageSetupChecklists from "@/components/UserProfile/page-setup-checklists";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache"; // 1. Import caching utility

const AUTHOR_SELECT = {
  id: true,
  type: true,
  name: true,
  bio: true,
  image: true,
  categories: true,
  backgroundImage: true,
};

const getUserDataCached = unstable_cache(
  async (userId) => {
    const user = await db.userProfile.findFirst({
      where: { id: userId },
      select: {
        id: true,
        type: true,
        name: true,
        handleName: true,
        bio: true,
        image: true,
        categories: true,
        backgroundImage: true,
      },
    });

    if (!user) return null;

    const userImages = await db.post.findMany({
      where: {
        authorId: user.id,
        image: { not: null },
      },
      orderBy: { createdAt: "desc" },
      select: {
        image: true,
        id: true,
        trashed: true,
      },
    });

    return { user, userImages };
  },
  ["user-profile-static-data"],
  {
    revalidate: 3600,
    tags: ["user-profile"],
  }
);

const UserProfilePage = async ({ params }) => {
  const session = await getAuthSession();
  const { userId } = await params;

  const { user, userImages } = await getUserDataCached(userId);

  if (!user) {
    return <div className="text-center p-10">User not found.</div>;
  }

  const [initialPosts, shortVideos] = await Promise.all([
    db.post.findMany({
      where: { authorId: user.id },
      include: {
        comments: { select: { id: true } }, // Only select IDs
        author: { select: AUTHOR_SELECT },
        votes: { select: { userId: true, type: true } }, // Only select necessary fields
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),

    db.shortsv.findMany({
      where: { authorId: user.id },
      include: {
        author: { select: AUTHOR_SELECT },
        comments: { select: { id: true } },
        shortsvVotes: { select: { userId: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),
  ]);

  const mergeData = [...initialPosts, ...shortVideos];

  const sortedData = mergeData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="grid grid-cols-7 justify-center bg-neutral-100 xl:pr-56 xl:pl-72 pt-5 gap-x-2 dark:bg-neutral-900">
      <div className="col-span-3 relative space-y-4">
        {session?.user.id === user.id && user.type === "page" && (
          <PageSetupChecklists />
        )}
        <div className="sticky top-[8rem]">
          <UserBio userImages={userImages} user={user} />
        </div>
      </div>
      <div className="mx-2 space-y-2 col-span-4">
        <UserPostCreationSection user={user} />
        <UserPostsToolBar />
        <UserAllPosts initialPosts={sortedData} userId={user.id} />
      </div>
    </div>
  );
};

export default UserProfilePage;
