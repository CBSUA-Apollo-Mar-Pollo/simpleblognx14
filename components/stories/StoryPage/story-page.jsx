import React from "react";
import StoryPageSidebar from "./story-page-sidebar";
import StoryPageContent from "./story-page-content";

const StoryPage = ({ id, session }) => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <StoryPageSidebar session={session} />
      </div>
      <div className="col-span-8 bg-black ">
        <StoryPageContent session={session} />
      </div>
    </div>
  );
};

export default StoryPage;
