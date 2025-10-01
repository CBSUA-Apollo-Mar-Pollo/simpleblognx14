import { Loader2 } from "lucide-react";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { Icons } from "../utils/Icons";

const SwitchingProfileLoader = ({ profileInfo }) => {
  console.log(profileInfo, "profile info");
  return (
    <div className="fixed top-0 bg-neutral-900 flex  justify-center h-screen w-screen  z-[60]">
      <div className="flex flex-col items-center mt-[22vh] gap-x-2 text-lg">
        <div className="relative">
          <UserAvatar
            className="h-40 w-40 absolute top-[30px] left-[33px] border-transparent"
            user={{
              name: profileInfo?.name || null,
              image: profileInfo?.image || null,
            }}
          />
          <Icons.circularIcon className="h-56 w-56 text-neutral-500" />
        </div>
        <p className="text-white text-xl mt-4">
          Switching to {profileInfo?.name}...
        </p>

        <div className="font-bold mt-32">
          <span className=" px-4 py-[2px] rounded-full bg-yellow-500/80 text-[30px] ">
            E
          </span>
        </div>
      </div>
    </div>
  );
};

export default SwitchingProfileLoader;
