import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Link, Plus, Search, Triangle, User } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "@/actions/getAllFriends";
import UserAvatar from "@/components/utils/UserAvatar";
import { Checkbox } from "@/components/ui/Checkbox";

const CommunityDropdownInvite = () => {
  const [showInviteFriendModal, setShowInviteFriendModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const { data: allFriends } = useQuery({
    queryKey: "getAllFriends",
    queryFn: async () => {
      const res = await getAllFriends();
      return res;
    },
  });

  console.log(allFriends, "All friends");
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="px-3 py-2 text-black bg-white dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 border border-neutral-300 hover:bg-neutral-200">
            <Plus className="h-4 w-4 mr-1" />
            Invite
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-[15.5vw] bg-transparent shadow-none border-none min-h-[30vh] min-w-[25vw]">
          <div className="flex flex-col items-end relative  ">
            <Triangle className="-rotate-90 text-white fill-white z-20 dark:fill-neutral-800 dark:text-neutral-800" />
            <div className="bg-white absolute top-[10px] right-[2px] shadow-lg z-10 rounded-md p-2 pb-2 dark:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.60)] dark:bg-neutral-800">
              <DropdownMenuItem
                onSelect={() => setShowInviteFriendModal(true)}
                className="dark:hover:bg-neutral-800"
              >
                <Button
                  variant="ghost"
                  className="flex items-start justify-start gap-x-2 pb-12 w-full dark:hover:bg-neutral-700"
                >
                  <User className="mt-1 dark:text-neutral-200" />
                  <div className="flex flex-col items-start dark:text-neutral-200">
                    <span className="text-sm font-semibold">
                      Invite friends
                    </span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-300">
                      Invite people you're connected to
                    </span>
                  </div>
                </Button>
              </DropdownMenuItem>
              <Button
                variant="ghost"
                className="flex items-start gap-x-2 pb-12 w-full dark:hover:bg-neutral-700"
              >
                <Link className="mt-1 h-5 w-5 dark:text-neutral-200" />
                <div className="flex flex-col items-start dark:text-neutral-200">
                  <span className="text-sm font-semibold">
                    Invite with link
                  </span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">
                    Send an invite link so people can request to join
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* invite friends modal */}
      {/* dev message: i have put modal here instead of creating a component*/}
      {/* because dialog is not rendering as a modal if put in a component because of dropdown    */}

      <Dialog
        open={showInviteFriendModal}
        onOpenChange={setShowInviteFriendModal}
      >
        <DialogContent className="min-w-[45vw] p-0 dark:border-0 dark:bg-neutral-800 dark:text-white">
          <DialogHeader className="pt-4">
            <DialogTitle className="text-center text-[20px] font-bold">
              Invite friends to this community
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-5 h-[60vh] border-t border-b dark:border-neutral-600">
            <div className="col-span-3 dark:bg-neutral-800 mx-4">
              <div className="relative flex items-center mt-2 ">
                <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
                <Input
                  placeholder="Search for friends by username"
                  className=" pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full w-full text-sm dark:placeholder:text-white"
                />
              </div>

              {/* friends list */}
              <div className=" mt-4">
                {allFriends.length === 0 && (
                  <p className="font-semibold text-center">
                    No friends to invite
                  </p>
                )}

                <div className="flex flex-col space-y-1">
                  {allFriends.map((friend) => (
                    <div className="flex items-center justify-between gap-x-2 dark:hover:bg-neutral-700 py-1 pl-2 rounded-lg hover:cursor-pointer">
                      <div className="flex items-center gap-x-2">
                        <UserAvatar
                          className="h-10 w-10"
                          user={{
                            name: friend.name || null,
                            image: friend.image || null,
                          }}
                        />

                        <p className="font-semibold">{friend.name}</p>
                      </div>

                      <Checkbox className="tborder border-neutral-50 h-5 w-5 mr-4 " />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-2 dark:bg-neutral-900 px-4">
              <div className="pt-4">
                <p>0 friends selected</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-x-2 mr-2 mb-3">
            <Button variant="ghost">Cancel</Button>
            <Button>Send Invites</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommunityDropdownInvite;
