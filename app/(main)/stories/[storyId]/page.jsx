import StoryPage from "@/components/stories/StoryPage/story-page";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const StoryHomePage = async ({ params }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <StoryPage id={params.storyId} session={session} />;
};

export default StoryHomePage;
