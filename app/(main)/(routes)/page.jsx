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
import Image from "next/image";
import { Home, Plus } from "lucide-react";
import HomePageStoryCards from "@/components/stories/homepage-story-cards";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/utils/Icons";

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
      community: {
        include: {
          members: true,
        },
      },
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

  // added a boolean key value
  const updatedShortVideos = shortVideos.map((item) => ({
    ...item,
    isShortsV: true,
  }));

  const mergeData = [...posts, ...updatedShortVideos];

  const sortedData = mergeData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
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

  //
  return (
    <div className="grid  xl:grid-cols-12 lg:grid-cols-7 grid-cols-1 dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className="  xl:col-span-3 xl:block hidden relative border-r border-neutral-200 dark:border-neutral-800 mr-[5vw] ">
        <Sidebar session={session} />
      </div>

      {/* middle section all posts and adding posts */}
      <div className=" xl:col-span-6 lg:col-span-5  lg:pl-5 lg:pr-3 xl:bg-white  xl:dark:bg-neutral-900 bg-gray-300">
        <div className="xl:mt-5 2xl:mx-[5vw] xl:mx-[1rem]">
          {/* show in mobile */}
          <div className="xl:hidden ">
            <div className="xl:bg-neutral-200 xl:dark:bg-neutral-900 bg-white dark:bg-neutral-800 xl:border-none border-b grid grid-cols-5">
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Home className="  h-6 w-6 dark:text-neutral-100 text-neutral-700" />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Play className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Group className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Messager className="h-5 w-5 fill-neutral-600 dark:fill-neutral-50" />
              </div>
              <div className="flex items-center justify-center  py-3">
                <Icons.bell className="fill-neutral-600 dark:fill-neutral-300 dark:text-neutral-50 text-neutral-600 h-6 w-6 " />
              </div>
            </div>
          </div>
          {session?.user && (
            <>
              <div className=" lg:pt-3 lg:pb-1 lg:px-5 lg:rounded-lg rounded-none bg-white border-t border-neutral-200 dark:bg-neutral-800 drop-shadow dark:border-0">
                <div className="flex flex-row items-center lg:space-x-4 gap-x-2 lg:px-0 lg:py-0 px-2 py-3">
                  <Link href={`/user/${session?.user.id}`}>
                    <UserAvatar
                      className="h-10 w-10 "
                      user={{
                        name: session?.user.name || null,
                        image: session?.user.image || null,
                      }}
                    />
                  </Link>
                  <AddPostModal session={session} />
                  <div className="lg:hidden block">
                    <AddGalleryPostModal session={session} />
                  </div>
                </div>

                <Separator className="mt-3 dark:bg-neutral-700 lg:block hidden" />

                <div className="lg:flex items-center justify-center my-1 hidden">
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

              <HomePageStoryCards session={session} />
            </>
          )}

          {/* all post cards */}
          <Posts
            initialPosts={sortedData}
            session={session}
            deleteImage={deleteImage}
          />
        </div>
      </div>
      {/* third section recent posts and who to follow */}
      <div className="   lg:flex lg:col-span-3 hidden relative  flex-col border-l dark:border-neutral-800 px-2 ml-[5vw]">
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

          {session?.user && (
            <>
              <Separator className="my-2" />

              <div className="mt-2 ml-2">
                <h1 className="font-semibold dark:text-neutral-50">
                  Group chats
                </h1>

                <Button className="bg-transparent flex items-center justify-start gap-x-3 p-0 pl-2 hover:bg-neutral-200 w-full py-7 my-2">
                  <Plus className="text-black bg-neutral-100 p-2 h-9 w-9 rounded-full" />
                  <span className="text-black dark:text-white">
                    Create group chat
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
