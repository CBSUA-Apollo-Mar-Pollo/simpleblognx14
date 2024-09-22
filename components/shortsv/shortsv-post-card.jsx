"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";
import UserAvatar from "../utils/UserAvatar";
import { Dot, Globe, MoreHorizontal, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";

const ShortsVPostCard = ({
  videoData,
  session,
  shortsvVotesAmt,
  currentShortsvVote,
}) => {
  console.log(videoData, "shortsVPostCard");

  const router = useRouter();

  const date = new Date(videoData.createdAt);
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleClick = () => {
    router.push(`/shortsv/${videoData.id}`);
  };

  return (
    <Card className="rounded-2xl shadow-md" onClick={() => handleClick()}>
      <CardContent className="p-0">
        <div
          className="flex justify-center bg-neutral-400 rounded-2xl  relative"
          style={{
            background: `
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
            linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
          `,
          }}
        >
          <div
            className="absolute top-0 flex justify-between w-full px-5 rounded-2xl"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
            }}
          >
            <div className="gap-x-2 flex items-start mt-4">
              <UserAvatar
                className="h-10 w-10 cursor-pointer"
                post="post"
                user={{
                  handleName: videoData?.author?.handleName,
                  bio: videoData?.author?.bio,
                  birthdate: videoData?.author?.birthdate,
                  name: videoData?.author?.name || null,
                  image: videoData?.author?.image || null,
                }}
              />
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold">
                  {videoData?.author?.name || videoData?.author?.handleName}
                </span>
                <div className="flex items-center">
                  <h6 className="text-xs text-white">ShortsV</h6>

                  <Dot className="text-white -mx-0.5" />

                  <h6 className="text-white text-xs -mx-0.5">
                    {formattedDate}
                  </h6>

                  <Dot className="text-white -mx-0.5" />

                  <Globe className="text-white h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-3 mr-2">
              <VolumeX className="stroke-white flex items-start justify-start z-20 cursor-pointer w-6 h-6" />
              <MoreHorizontal className="stroke-white" />
            </div>
          </div>
          <div className="max-w-[25vw] ">
            <video
              key={videoData?.videoUrl}
              loop
              playsInline
              autoPlay
              preload="metadata"
              muted={true}
              className="max-h-[80vh] h-[80vh]  z-10 cursor-pointer object-cover"
            >
              <source src={videoData?.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortsVPostCard;
