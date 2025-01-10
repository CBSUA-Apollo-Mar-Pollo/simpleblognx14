import CreateStoryPage from "@/components/stories/CreateStoryPage/create-story-page";
import CraeateStoryPageContent from "@/components/stories/CreateStoryPage/create-storypage-content";
import CreateStoryPageSidebar from "@/components/stories/CreateStoryPage/create-storypage-sidebar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const CreateStoriesPage = async () => {
  const session = await getAuthSession();
  return <CreateStoryPage session={session} />;
};

export default CreateStoriesPage;
