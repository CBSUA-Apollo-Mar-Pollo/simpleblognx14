import ChatHomeContactList from "@/components/chat/chat-home-contact-list";
import PopularCommunities from "@/components/community/popular-communities";
import HistoryPageComponent from "@/components/history/history-page-component";
import RecentPostsCard from "@/components/RecentPosts/RecentPostsCard";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import Sidebar from "@/components/utils/Sidebar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import React from "react";
import { UTApi } from "uploadthing/server";

const HistoryPage = async () => {
  const session = await getAuthSession();

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

  const initialHistoryData = await db.history.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      post: {
        include: {
          author: {
            select: {
              id: true,
              type: true,
              name: true,
              bio: true,
              email: true,
              image: true,
              category: true,
            },
          },
          comments: true,
          votes: true,
          community: {
            include: {
              members: true,
            },
          },
        },
      },
    },
  });

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  };

  return (
    <div className="grid grid-cols-12 dark:bg-neutral-900">
      <div className="  xl:col-span-3 xl:block hidden relative border-r border-neutral-200 dark:border-neutral-800 mr-[5vw] ">
        <Sidebar />
      </div>

      <div className=" xl:col-span-6 lg:col-span-5  lg:pl-5 lg:pr-3   dark:bg-neutral-900">
        <div className="mt-5 2xl:mx-[5vw] xl:mx-[1rem]  space-y-3 ">
          <HistoryPageComponent
            posts={initialHistoryData}
            session={session}
            deleteImage={deleteImage}
          />
        </div>
      </div>

      <div className="   lg:flex lg:col-span-3 hidden relative  flex-col border-l dark:border-neutral-800 px-2 ml-[5vw]">
        <div className="sticky top-16">
          <RecentPostsCard />

          {!session?.user && <PopularCommunities />}

          {session?.user && (
            <>
              <ChatHomeContactList conversationList={conversationList} />
            </>
          )}

          <Separator className="my-2" />

          <div className="mt-2 ml-2">
            <h1 className="font-semibold dark:text-neutral-50">Group chats</h1>

            <Button className="bg-transparent flex items-center justify-start gap-x-3 p-0 pl-2 hover:bg-neutral-200 w-full py-7 my-2">
              <Plus className="text-black bg-neutral-100 p-2 h-9 w-9 rounded-full" />
              <span className="text-black dark:text-white">
                Create group chat
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
