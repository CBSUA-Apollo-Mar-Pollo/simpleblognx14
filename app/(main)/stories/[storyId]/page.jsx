import { redirect } from "next/navigation";
import React from "react";

import { getStoryData } from "@/actions/getStoryData";
import StoryPage from "@/components/stories/StoryPage/story-page";
import { getAuthSession } from "@/lib/auth";

const StoryHomePage = async ({ params }) => {
  const session = await getAuthSession();
  const stories = await getStoryData(session?.user.id);

  if (!session?.user) {
    return redirect("/");
  }
  return <StoryPage id={params.storyId} session={session} stories={stories} />;
};

export default StoryHomePage;
