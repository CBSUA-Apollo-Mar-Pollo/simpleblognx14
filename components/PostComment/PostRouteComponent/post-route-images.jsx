import React from "react";
import BackgroundImagePost from "../BackgroundImagePost";
import ImagePost from "../ImagePost";
import { db } from "@/lib/db";
import { getPostRouteImages } from "@/actions/post-route-actions/get-post-route-images";
import { cn } from "@/lib/utils";

const PostRouteImages = async ({ postId, index }) => {
  const images = await getPostRouteImages(postId);
  return (
    <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
      {images.userStatus === "updated his cover photo" ? (
        <BackgroundImagePost
          image={images.image}
          index={index}
          postId={images.id}
        />
      ) : (
        <ImagePost image={images.image} index={index} postId={images.id} />
      )}
    </div>
  );
};

export default PostRouteImages;
