import React from "react";
import BackgroundImagePost from "../BackgroundImagePost";
import ImagePost from "../ImagePost";
import { db } from "@/lib/db";
import { getPostRouteImages } from "@/actions/post-route-actions/get-post-route-images";
import { cn } from "@/lib/utils";

const PostRouteImages = async ({ postId, index }) => {
  const post = await getPostRouteImages(postId);

  const media = Array.isArray(post.media) ? post.media : [];

  const images = media.filter((m) => m?.type?.startsWith("image/"));
  const videos = media.filter((m) => m?.type?.startsWith("video/"));
  console.log(images, "images");
  return (
    <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
      <p>assa</p>
      {post.userStatus ? (
        <BackgroundImagePost
          image={images[0].url}
          index={index}
          postId={images.id}
        />
      ) : (
        <ImagePost image={images} index={index} postId={post.id} />
      )}
    </div>
  );
};

export default PostRouteImages;
