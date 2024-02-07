"use client";

import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Separator } from "../../ui/Separator";
import { useSession } from "next-auth/react";
import BackgroundImage from "./BackgroundImage";

const ProfilePicture = ({ user, deleteImage }) => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  return (
    <div className="relative">
      {imageUrl.length !== 0 && (
        <div className="bg-neutral-700 absolute top-0 z-10 opacity-80 text-white w-full">
          <div className="flex justify-end py-2 gap-x-4 mx-5">
            <Button
              onClick={() => {
                setImageUrl("");
                deleteImage(imageUrl);
              }}
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <BackgroundImage
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        session={session}
        user={user}
      />

      <div className="my-5 w-full">
        <div className="ml-[31rem] flex justify-between">
          <h1 className="font-bold text-4xl">{user?.name}</h1>
        </div>
      </div>

      <Separator className="mt-10" />

      <div className="">
        <ul className="flex justify-end text-neutral-800 py-1">
          <Button
            variant="ghost"
            className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
          >
            Post
          </Button>
          <Button
            variant="ghost"
            className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
          >
            Photos
          </Button>
          <Button
            variant="ghost"
            className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
          >
            More
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePicture;
