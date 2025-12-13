import React, { Suspense } from "react";
import PostRouteImages from "@/components/PostComment/PostRouteComponent/post-route-images";
import PostRouteComments from "@/components/PostComment/PostRouteComponent/post-route-comments";

export const metadata = {
  title: `Estorya | Post Comments`,
  description: "All in one social media app",
};

const postCommentPage = async ({ params }) => {
  const { postId, index } = await params;

  return (
    <div className="grid grid-cols-4 relative">
      <Suspense
        fallback={
          <div className="col-span-3 h-screen bg-black animate-pulse"></div>
        }
      >
        <PostRouteImages postId={postId} index={index} />
      </Suspense>
      <Suspense
        fallback={
          <div className="col-span-1 h-screen bg-white animate-pulse"></div>
        }
      >
        <PostRouteComments postId={postId} index={index} />
      </Suspense>
    </div>
  );
};

export default postCommentPage;
