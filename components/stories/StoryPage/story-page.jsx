"use client";

import React from "react";
import StoryPageSidebar from "./story-page-sidebar";
import StoryPageContent from "./story-page-content";
import { getStoryData } from "@/actions/getStoryData";

const StoryPage = ({ id, session, stories }) => {
  console.log(stories, "stories in story page");

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <StoryPageSidebar session={session} stories={stories} />
      </div>
      <div className="col-span-8 bg-black ">
        <StoryPageContent session={session} stories={stories} />
      </div>
    </div>
  );
};

export default StoryPage;
