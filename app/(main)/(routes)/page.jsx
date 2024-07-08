import { db } from "@/lib/db";

import Sidebar from "@/components/utils/Sidebar";
import { getAuthSession } from "@/lib/auth";
import RecentPostsCard from "@/components/RecentPosts/RecentPostsCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import AddPostModal from "@/components/Post/AddPostModal";
import Posts from "@/components/Post/Posts";
import UserAvatar from "@/components/utils/UserAvatar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Separator } from "@/components/ui/Separator";
import AddGalleryPostModal from "@/components/Post/AddImagePostModal";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await db.blog.findMany({
    include: {
      author: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  const users = await db.user.findMany({
    where: {
      NOT: {
        id: session?.user.id,
      },
    },
    take: 3,
  });

  return (
    <div className="grid grid-cols-4 bg-neutral-200/30 dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className=" col-span-1 relative">
        <Sidebar session={session} />
      </div>
      {/* middle section all posts and adding posts */}
      <div className="mt-5 space-y-3 col-span-2 mx-[5rem] ">
        {session?.user && (
          <div className=" pt-3 pb-1 px-5 rounded-lg bg-white dark:bg-neutral-800 drop-shadow dark:border-0">
            <div className="flex flex-row items-center space-x-4">
              <Link href={`/user/${session?.user.id}`}>
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: session?.user.name || null || user?.name,
                    image: session?.user.image || null || user?.image,
                  }}
                />
              </Link>
              <AddPostModal session={session} />
            </div>

            <Separator className="mt-3 dark:bg-neutral-700" />

            <div className="flex items-center justify-center my-1 ">
              <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                <img src="/ImageIcons/live.png" className="h-8 w-8" />
                <span className="dark:text-neutral-100 text-sm">
                  Live video
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                <AddGalleryPostModal session={session} />
              </div>
              <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
                <img src="/ImageIcons/smile.png" className="h-7 w-7" />
                <span className="dark:text-neutral-100 text-sm">
                  Feeling/Activity
                </span>
              </div>
            </div>
          </div>
        )}
        {/* all post cards */}
        <Posts initialPosts={posts} session={session} />
      </div>
      {/* third section recent posts and who to follow */}
      <div className=" col-span-1 relative flex flex-col ">
        <div className="sticky top-16">
          <RecentPostsCard />
          <div className="bg-white dark:bg-neutral-800 rounded-2xl mr-4 mt-3 px-5 pt-1 drop-shadow-lg">
            <h1 className=" text-neutral-950 dark:text-neutral-200 font-bold text-xl mt-2">
              Who to follow
            </h1>
            {users.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 my-3">
                  <UserAvatar
                    post="post"
                    className="h-10 w-10 "
                    user={{
                      handleName: user.handleName,
                      bio: user.bio,
                      birthdate: user.birthdate,
                      name: user.name || null,
                      image: user.image || null,
                    }}
                  />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-semibold dark:text-neutral-200">
                      {user.name}
                    </h2>
                    <h3 className="text-sm text-neutral-500 dark:text-neutral-300">
                      {user.handleName}
                    </h3>
                  </div>
                </div>
                <Button size="sm" className="px-5 rounded-full">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
