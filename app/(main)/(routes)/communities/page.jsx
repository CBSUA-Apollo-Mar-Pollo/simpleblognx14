import CommunityContent from "@/components/community/community-content";
import useCustomHooks from "@/hooks/use-custom-hooks";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CommunitiesInitialPage = async () => {
  return <CommunityContent />;
};

export default CommunitiesInitialPage;
