"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const CommunityBanner = ({ communityDetails, session }) => {
  const { resolvedTheme } = useTheme();
  const { data: dominantColor, error } = useQuery({
    queryKey: ["dominantColor", communityDetails.banner],
    queryFn: async () => {
      const res = await getDominantColor(communityDetails.banner);
      return res;
    },
  });

  return (
    <div
      className="relative "
      style={{
        backgroundImage:
          resolvedTheme === "light"
            ? `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.9) 0%, rgba(255, 255, 255, 1) 100%)`
            : `linear-gradient(to bottom, rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.3) 0%, rgba(36,36,36, 1) 100%)`,
      }}
    >
      <div className="mx-52">
        <div>
          {/* if the user has uploaded a cover photo display it */}
          {communityDetails.banner ? (
            <div className="overflow-hidden h-[45vh] rounded-b-3xl scroll-container bg-neutral-900 z-20">
              <div className="scroll-container">
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={communityDetails.banner}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="w-[80vw] max-h-fit"
                  // style={{ transform: "translateY()" }} // Adjust the percentage as needed
                />
              </div>
            </div>
          ) : (
            // show a blank cover photo
            <div className=" rounded-b-3xl scroll-container bg-neutral-400 dark:bg-neutral-800 h-[55vh]">
              <div className="w-[80vw]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityBanner;
