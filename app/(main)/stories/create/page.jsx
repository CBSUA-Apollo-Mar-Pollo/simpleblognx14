import CraeateStoryPageContent from "@/components/stories/CreateStoryPage/create-storypage-content";
import CreateStoryPageSidebar from "@/components/stories/CreateStoryPage/create-storypage-sidebar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const CreateStoriesPage = async () => {
  const session = await getAuthSession();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <CreateStoryPageSidebar session={session} />
      </div>

      <div className="col-span-8 bg-white ">
        <CraeateStoryPageContent session={session} />
      </div>
    </div>
  );
};

export default CreateStoriesPage;
