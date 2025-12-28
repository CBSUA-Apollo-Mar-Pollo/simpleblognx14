import { Suspense } from "react";
import Sidebar from "@/components/utils/Sidebar";
import HomeFeed from "@/components/utils/home-page-components/home-feed";
import HomeFeedLoader from "@/components/Loaders/home-feed-loader";
import HomeRightSidebar from "@/components/utils/home-page-components/home-right-sidebar";
import { getHomeFeedData } from "@/actions/get-home-feed-data";

export const metadata = {
  title: `Estorya | Home`,
};

export default async function HomePage() {
  const sortedData = await getHomeFeedData();

  return (
    <div className="grid  xl:grid-cols-12 lg:grid-cols-7 grid-cols-1 dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className="  xl:col-span-3 xl:block hidden relative border-r border-neutral-300 dark:border-neutral-800 mr-[5vw] ">
        <Sidebar />
      </div>

      {/* middle section all posts and adding posts */}
      <div className=" xl:col-span-6 lg:col-span-5  lg:pl-5 lg:pr-3 xl:bg-white  xl:dark:bg-neutral-900 bg-gray-300">
        <HomeFeed sortedData={sortedData} />
      </div>
      {/* third section recent posts and who to follow */}
      <div className="   lg:flex lg:col-span-3 hidden relative  flex-col border-l border-neutral-300 dark:border-neutral-800 px-2 ml-[5vw]">
        <HomeRightSidebar />
      </div>
    </div>
  );
}
