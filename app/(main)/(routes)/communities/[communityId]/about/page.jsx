import CommunityContent from "@/components/community/community-content/community-content";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const CommunityAboutPage = async ({ params }) => {
  const session = await getAuthSession();
  const communityDetails = await db.community.findUnique({
    where: {
      id: params.communityId,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
      members: {
        include: {
          user: true,
        },
      },
      shortsv: true,
    },
  });

  if (session?.user?.id === communityDetails.creatorId) {
    return redirect(`/communities/${params.communityId}`);
  }
  return (
    <div>
      <CommunityContent
        {...{ communityDetails }}
        communityId={params.communityId}
      />
    </div>
  );
};

export default CommunityAboutPage;
