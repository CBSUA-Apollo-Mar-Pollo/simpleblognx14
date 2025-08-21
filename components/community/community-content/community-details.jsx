import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { CakeSlice, Globe, Lock, Pencil, Plus } from "lucide-react";
import React from "react";

const CommunityDetails = ({ communityDetails, session }) => {
  const date = new Date(communityDetails.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // "Nov"
    day: "numeric", // "9"
    year: "numeric", // "2024"
  });
  return (
    <div className="bg-white dark:bg-neutral-800 border dark:border-0 py-2 rounded-xl px-3">
      <div className="flex items-center justify-between px-5">
        <h4 className="font-semibold text-2xl mt-2 dark:text-neutral-300">
          {communityDetails.name}
        </h4>
        {session?.user.id === communityDetails.creatorId && (
          <Button
            variant="icon"
            className="bg-neutral-300 dark:bg-neutral-700 rounded-full py-2 px-3"
          >
            <Pencil className="h-4 w-4 dark:text-neutral-300" />
          </Button>
        )}
      </div>

      <div className="mt-4 px-5">
        <p className="text-sm dark:text-neutral-300">
          {communityDetails.description}
        </p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-2 dark:text-neutral-300">
            <CakeSlice className="h-5 w-5" />
            <p className="text-[13px]">Created {formattedDate}</p>
          </div>
          <div className="flex items-center gap-x-2 ">
            {communityDetails.accessType === "Public" ? (
              <Globe className="h-5 w-5 dark:text-neutral-300" />
            ) : (
              <Lock className="h-5 w-5 dark:text-neutral-300" />
            )}
            <p className="text-[13px] dark:text-neutral-300">
              {communityDetails.accessType}
            </p>
          </div>
        </div>

        {session?.user.id === communityDetails.creatorId && (
          <div className="flex justify-center mt-2">
            <Button
              variant="ghost"
              className="border px-8 rounded-full gap-x-2 text-xs dark:text-neutral-300 "
            >
              <Plus className="h-4 w-4 dark:text-neutral-300" />
              Add a community guide
            </Button>
          </div>
        )}

        <div className="flex items-center justify-center gap-x-10 my-5">
          {/* members */}
          <div className="flex flex-col items-center text-sm dark:text-neutral-300">
            <span>{communityDetails.members.length}</span>
            <span>Members</span>
          </div>
          <div className="flex flex-col items-center text-sm dark:text-neutral-300">
            <span>{communityDetails.members.length}</span>
            <span>Online</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* admins */}
      <div className="px-5 my-3">
        <h4 className="font-semibold text-neutral-700 dark:text-neutral-300">
          ADMIN
        </h4>

        <div className="mt-2">
          {communityDetails.members.map((member, index) => (
            <div className="flex items-center gap-x-2" key={index}>
              <UserAvatar
                className="h-9 w-9 "
                user={{
                  name: member.user.name || null,
                  image: member.user.image || null,
                }}
              />

              <span className="text-neutral-600 text-[14px] font-medium dark:text-neutral-300">
                {member.user.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Community settings */}
      {session?.user.id === communityDetails.creatorId && (
        <>
          <Separator />

          <div className="px-5 my-3">
            <h4 className="font-semibold text-neutral-700 dark:text-neutral-300">
              COMMUNITY SETTINGS
            </h4>

            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-neutral-300">
                Community appearance
              </span>
              {session?.user.id === communityDetails.creatorId && (
                <Button
                  variant="icon"
                  className="bg-neutral-300 dark:bg-neutral-700 rounded-full py-2 px-3"
                >
                  <Pencil className="h-4 w-4 dark:text-neutral-300" />
                </Button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                className="border px-8 rounded-full gap-x-2 text-xs w-full dark:text-neutral-300"
              >
                Edit Widgets
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityDetails;
