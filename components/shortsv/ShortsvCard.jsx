"use client";

import React, { useState } from "react";
import LogoVideoAndIcon from "./LogoVideoAndIcon";
import { Separator } from "../ui/Separator";
import CommentSection from "../PostComment/CommentSection";
import VideoDescription from "./VideoDescription";
import ProfileImageAndIcons from "../PostComment/ProfileImageAndIcons";
import ShortsVCommentSection from "./shortsv-comment-section";
import { useToggleCommentSection } from "@/hooks/use-toggle-comment-section";

const ShortsvCard = ({ video, comments, session, nextLink }) => {
  const { isToggleCommentSection, setToggled } = useToggleCommentSection();
  return (
    <div className="grid grid-cols-4 relative bg-neutral-950">
      <div
        className={`${
          isToggleCommentSection ? "col-span-3 " : "col-span-4"
        }  h-screen`}
      >
        <LogoVideoAndIcon
          videoData={video}
          commentAmt={video?.comments?.length}
          setToggleCommentSection={setToggled}
          toggleCommentSection={isToggleCommentSection}
          nextLink={nextLink}
        />
      </div>

      {isToggleCommentSection && (
        <div className="col-span-1 bg-neutral-800 border-l border-neutral-700 max-h-full relative">
          <ProfileImageAndIcons session={session} />

          <Separator className="bg-gray-700" />
          <div
            className={` overflow-auto max-h-[100vh] ${
              session?.user ? "pb-[22vh]" : "pb-[10vh]"
            }`}
          >
            <VideoDescription
              video={video}
              commentAmt={video.comments.length}
              session={session}
            />

            <Separator className="bg-gray-700" />

            <ShortsVCommentSection
              session={session}
              post={video}
              shortsvId={video.id}
              initialComments={comments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortsvCard;
