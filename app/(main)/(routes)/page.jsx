import { UTApi } from "uploadthing/server";
import { Suspense } from "react";
import { getAuthSession } from "@/lib/auth";
import Sidebar from "@/components/utils/Sidebar";
import HomeFeed from "@/components/utils/home-page-components/home-feed";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import HomeFeedLoader from "@/components/Loaders/home-feed-loader";

export const metadata = {
  title: `Estorya | Home`,
};

export default async function HomePage() {
  const session = await getAuthSession();

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  };

  return (
    <div className="grid  xl:grid-cols-12 lg:grid-cols-7 grid-cols-1 dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className="  xl:col-span-3 xl:block hidden relative border-r border-neutral-300 dark:border-neutral-800 mr-[5vw] ">
        <Sidebar />
      </div>

      {/* middle section all posts and adding posts */}
      <div className=" xl:col-span-6 lg:col-span-5  lg:pl-5 lg:pr-3 xl:bg-white  xl:dark:bg-neutral-900 bg-gray-300">
        <Suspense fallback={<HomeFeedLoader />}>
          <HomeFeed deleteImage={deleteImage} />
        </Suspense>
      </div>
      {/* third section recent posts and who to follow */}
      <div className="   lg:flex lg:col-span-3 hidden relative  flex-col border-l border-neutral-300 dark:border-neutral-800 px-2 ml-[5vw]">
        <div className="sticky top-16">
          {/* <RecentPostsCard /> */}

          {/* {!session?.user && <PopularCommunities communities={communities} />} */}

          {/* {session?.user && (
            <Suspense fallback={<Skeleton className="h-24 w-full" />}>
              <ChatHomeContactList
                conversationList={conversationList}
                session={session}
                isPending={isPending}
              />
               <Separator className="my-2" />
            </Suspense>
          )} */}

          {session?.user && (
            <>
              <div className="mt-2 ml-2">
                <h1 className="font-semibold dark:text-neutral-50">
                  Group chats
                </h1>

                <Button className="bg-transparent flex items-center justify-start gap-x-3 p-0 pl-2 hover:bg-neutral-200 w-full py-7 my-2 hover:rounded-xl">
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
