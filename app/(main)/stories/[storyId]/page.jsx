import StoryPage from "@/components/stories/StoryPage/story-page";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const StoryHomePage = async ({ params }) => {
  const session = await getAuthSession();
  return <StoryPage id={params.storyId} session={session} />;
};

export default StoryHomePage;
