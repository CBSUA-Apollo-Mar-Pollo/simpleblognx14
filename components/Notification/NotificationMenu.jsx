"use client";

import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";
import ToolTipComp from "../utils/ToolTipComp";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFriendRequestData } from "@/actions/getFriendRequestData";
import UserAvatar from "../utils/UserAvatar";
import axios from "axios";

const NotificationMenu = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const { data: friendRequestData } = useQuery({
    queryKey: ["getFriendRequestData"],
    queryFn: async () => {
      const res = await getFriendRequestData(session.user.id);
      return res;
    },
  });

  const { mutate: handleCancelAndFriendRequest } = useMutation({
    mutationFn: async (request) => {
      const payload = {
        userId: session.user.id,
        request,
      };

      await axios.post("/api/friendRequest", payload);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Success");
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none drop-shadow">
        <ToolTipComp content="Notification">
          <div
            className={`  ${
              open
                ? "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-300"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2 rounded-full cursor-pointer `}
          >
            <Icons.bell
              className={` ${
                open ? "text-blue-600" : "text-neutral-800"
              } dark:text-neutral-100`}
            />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white px-2 py-2 min-w-[22vw] -mr-14"
        align="end"
      >
        <div className="flex items-center justify-between mx-2">
          <DropdownMenuLabel className="text-2xl font-bold">
            Notifications
          </DropdownMenuLabel>
          <div>
            <MoreHorizontal />
          </div>
        </div>

        <div className="mx-2">
          <Button variant="ghost" className="font-semibold px-2 py-3">
            All
          </Button>
          <Button variant="ghost" className="font-semibold px-2 py-3">
            Unread
          </Button>
        </div>

        {/* friend request */}
        {friendRequestData && (
          <div className="mx-3">
            <h6 className="text-[14px] font-semibold my-2">Friend requests</h6>

            <DropdownMenuItem className="gap-x-3 p-2">
              <UserAvatar
                post="user"
                className="h-14 w-14 "
                user={{
                  handleName: friendRequestData?.requesterUserData.handleName,
                  bio: friendRequestData?.requesterUserData.bio,
                  birthdate: friendRequestData?.requesterUserData.birthdate,
                  name: friendRequestData?.requesterUserData.name || null,
                  image: friendRequestData?.requesterUserData.image || null,
                }}
              />
              <div className="w-full">
                <p className="font-semibold text-neutral-700 ml-1 my-1">
                  {friendRequestData?.requesterUserData.name}
                </p>
                <div className="flex gap-x-1">
                  <Button
                    onClick={() => handleCancelAndFriendRequest("true")}
                    size="sm"
                    className="w-full bg-blue-600 "
                  >
                    Confirm
                  </Button>
                  <Button size="sm" className="w-full">
                    Delete
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
            <Button size="sm" className="w-full mb-2 mt-3">
              See all
            </Button>
          </div>
        )}

        {/* Notifications */}
        <div className="mx-3">
          <p className="text-[14px] font-semibold my-2">Earlier</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
