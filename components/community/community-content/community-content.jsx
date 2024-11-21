import React from "react";
import CommunityBanner from "./community-banner";
import { getAuthSession } from "@/lib/auth";

const CommunityContent = async ({ communityDetails }) => {
  const session = await getAuthSession();
  return (
    <div>
      <CommunityBanner {...{ communityDetails, session }} />
    </div>
  );
};

export default CommunityContent;
