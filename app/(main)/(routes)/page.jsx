import { db } from "@/lib/db";

import Sidebar from "@/components/utils/Sidebar";
import { getAuthSession } from "@/lib/auth";
import RecentPostsCard from "@/components/RecentPosts/RecentPostsCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import AddPostModal from "@/components/Post/AddPostModal";
import Posts from "@/components/Post/Posts";
import UserAvatar from "@/components/utils/UserAvatar";
import Link from "next/link";
import { Separator } from "@/components/ui/Separator";
import AddGalleryPostModal from "@/components/Post/AddImagePostModal";
import { UTApi } from "uploadthing/server";
import ChatHomeContactList from "@/components/chat/chat-home-contact-list";
import PopularCommunities from "@/components/community/popular-communities";

export const metadata = {
  title: `Estorya | Home`,
};

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await db.blog.findMany({
    include: {
      author: true,
      comments: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  // short video posts
  const shortVideos = await db.shortsv.findMany({
    include: {
      author: true,
      comments: true,
      shortsVotes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  const mergeData = [...posts, ...shortVideos];

  const sortedData = mergeData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
    console.log(image);
  };

  const getAllConversationsByLogInUser = await db.conversation.findMany({
    where: {
      OR: [{ userOneId: session?.user.id }, { userTwoId: session?.user.id }],
    },
    include: {
      userOne: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      userTwo: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  const conversationList = getAllConversationsByLogInUser.map((item) => {
    let { userOne, userTwo, ...rest } = item;

    // Remove userOne if it matches session.user.id
    if (userOne.id === session.user.id) {
      userOne = null;
    }

    // Remove userTwo if it matches session.user.id
    if (userTwo.id === session.user.id) {
      userTwo = null;
    }

    // Return the new object with potentially null values
    return {
      ...rest,
      userOne,
      userTwo,
    };
  });

  return (
    <div className="grid grid-cols-4  dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className=" col-span-1 relative border-r border-neutral-200 dark:border-neutral-800 w-[20vw] ">
        <Sidebar session={session} />
      </div>

      {/* middle section all posts and adding posts */}
      <div className="mt-5 space-y-3 col-span-2  ml-[4rem] mr-[6rem] ">
        {session?.user && (
          <div className=" pt-3 pb-1 px-5 rounded-lg bg-white border-t border-neutral-200 dark:bg-neutral-800 drop-shadow dark:border-0">
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
        <Posts
          initialPosts={sortedData}
          session={session}
          deleteImage={deleteImage}
        />
      </div>
      {/* third section recent posts and who to follow */}
      <div className=" col-span-1 relative flex flex-col border-l dark:border-neutral-800 px-3">
        <div className="sticky top-16">
          <RecentPostsCard />

          {!session?.user && <PopularCommunities />}

          {session?.user && (
            <>
              <ChatHomeContactList
                conversationList={conversationList}
                session={session}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
