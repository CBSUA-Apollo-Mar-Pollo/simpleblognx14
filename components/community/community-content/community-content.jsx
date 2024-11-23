import React from "react";
import CommunityBanner from "./community-banner";
import { getAuthSession } from "@/lib/auth";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import AddPostModal from "@/components/Post/AddPostModal";
import AddGalleryPostModal from "@/components/Post/AddImagePostModal";
import { Button } from "@/components/ui/Button";
import { CakeSlice, ChevronDown, Lock, Pencil, Plus } from "lucide-react";

const CommunityContent = async ({ communityDetails }) => {
  const session = await getAuthSession();
  const date = new Date(communityDetails.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // "Nov"
    day: "numeric", // "9"
    year: "numeric", // "2024"
  });

  return (
    <div>
      <CommunityBanner {...{ communityDetails, session }} />

      <div className="bg-neutral-100">
        <div className="grid grid-cols-8 pt-4 gap-x-4 ml-16">
          <div className="col-span-5">
            <div className="border pt-3 pb-1 px-5 rounded-xl bg-white dark:bg-neutral-800 dark:border-0 ml-16">
              <div className="flex flex-row items-center space-x-4">
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: session?.user.name || null || user?.name,
                    image: session?.user.image || null || user?.image,
                  }}
                />

                <AddPostModal session={session} />
              </div>

              <Separator className="mt-3 dark:bg-neutral-700" />

              <div className="flex items-center justify-center my-1 ">
                <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                  <img src="/ImageIcons/live.png" className="h-8 w-8" />
                  <span className="dark:text-neutral-100 text-sm">
                    Live video
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                  <AddGalleryPostModal session={session} />
                </div>
                <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
                  <img src="/ImageIcons/smile.png" className="h-7 w-7" />
                  <span className="dark:text-neutral-100 text-sm">
                    Feeling/Activity
                  </span>
                </div>
              </div>
            </div>

            <div className="ml-16 mt-1">
              <div className="mb-1">
                <Button
                  variant="ghost"
                  className="text-neutral-700 font-semibold gap-x-1"
                >
                  Popular
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="bg-neutral-200" />
            </div>
            {/* todo: user posts */}

            {communityDetails.posts.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full mt-10">
                <h2 className="font-bold text-2xl">
                  This community doesn't have any posts yet
                </h2>
                <span className="text-neutral-600">
                  make one and get this feed started.
                </span>
              </div>
            )}
          </div>

          {/* community info */}
          <div className="col-span-3 mb-4">
            <div className="bg-white border mr-32  py-2 rounded-xl">
              <div className="flex items-center justify-between px-5">
                <h4 className="font-semibold text-2xl mt-2">
                  {communityDetails.name}
                </h4>
                <Button
                  variant="icon"
                  className="bg-neutral-300 rounded-full py-2 px-3"
                >
                  <Pencil className="h-4 w-4 " />
                </Button>
              </div>

              <div className="mt-4 px-5">
                <p className="text-sm">{communityDetails.description}</p>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-x-2 ">
                    <CakeSlice className="h-5 w-5" />
                    <p className="text-[13px]">Created {formattedDate}</p>
                  </div>
                  <div className="flex items-center gap-x-2 ">
                    <Lock className="h-5 w-5" />
                    <p className="text-[13px]">{communityDetails.visibility}</p>
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <Button
                    variant="ghost"
                    className="border px-8 rounded-full gap-x-2 text-xs "
                  >
                    <Plus className="h-4 w-4" />
                    Add a community guide
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-x-10 my-5">
                  {/* members */}
                  <div className="flex flex-col items-center text-sm">
                    <span>{communityDetails.members.length}</span>
                    <span>Members</span>
                  </div>
                  <div className="flex flex-col items-center text-sm">
                    <span>{communityDetails.members.length}</span>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* admins */}
              <div className="px-5 my-3">
                <h4 className="font-semibold text-neutral-700">ADMIN</h4>

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

                      <span className="text-neutral-600 text-[14px] font-medium">
                        {member.user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Community settings */}
              <div className="px-5 my-3">
                <h4 className="font-semibold text-neutral-700">
                  COMMUNITY SETTINGS
                </h4>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Community appearance</span>
                  <Button
                    variant="icon"
                    className="bg-neutral-300 rounded-full py-2 px-3"
                  >
                    <Pencil className="h-4 w-4 " />
                  </Button>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    className="border px-8 rounded-full gap-x-2 text-xs w-full"
                  >
                    Edit Widgets
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityContent;
