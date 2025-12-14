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
import { getFriendRequestData } from "@/data/getFriendRequestData";
import UserAvatar from "../utils/UserAvatar";
import axios from "axios";
import { getNotificationData } from "@/data/getNotificationData";

const NotificationMenu = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const { data: friendRequestData } = useQuery({
    queryKey: ["getFriendRequestData"],
    queryFn: async () => {
      const res = await getFriendRequestData(session.user.id);
      return res;
    },
    suspense: true,
  });

  const { data: notificationData } = useQuery({
    queryKey: ["notificationData"],
    queryFn: async () => {
      const res = await getNotificationData(session.user.id);
      return res;
    },
    suspense: true,
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
      <DropdownMenuTrigger className="focus-visible:outline-none drop-shadow xl:block hidden">
        <ToolTipComp content="Notification">
          <div
            className={`  ${
              open
                ? "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-300"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2 rounded-full cursor-pointer relative`}
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
        className="bg-white dark:bg-neutral-800 px-2 py-2 min-w-[22vw] -mr-14 dark:border-0"
        align="end"
      >
        <div className="flex items-center justify-between mx-2">
          <DropdownMenuLabel className="text-2xl font-bold dark:text-white">
            Notifications
          </DropdownMenuLabel>
          <div>
            <MoreHorizontal className="dark:text-white" />
          </div>
        </div>

        <div className="mx-2">
          <Button
            variant="ghost"
            className="font-semibold px-2 py-3 dark:text-white"
          >
            All
          </Button>
          <Button
            variant="ghost"
            className="font-semibold px-2 py-3 dark:text-white"
          >
            Unread
          </Button>
        </div>

        {/* friend request */}
        {friendRequestData && (
          <div className="ml-3">
            <h6 className="text-[14px] font-semibold my-2 dark:text-neutral-100">
              Friend requests
            </h6>

            <DropdownMenuItem className="gap-x-3  dark:hover:bg-neutral-600/20 p-3">
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
                <p className="font-semibold text-neutral-700 ml-1 my-1 dark:text-neutral-50">
                  {friendRequestData?.requesterUserData.name}
                </p>
                <div className="flex gap-x-3">
                  <Button
                    onClick={() => handleCancelAndFriendRequest("true")}
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-600/80"
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    className="w-full dark:bg-neutral-700 dark:hover:bg-neutral-700/80"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
            <Button
              size="sm"
              className="w-full mb-2 mt-3 dark:bg-neutral-700 dark:hover:bg-neutral-700/80"
            >
              See all
            </Button>
          </div>
        )}

        {/* Notifications */}
        <div className="mx-3">
          <p className="text-[14px] font-semibold my-2 dark:text-white">
            Earlier
          </p>

          {notificationData?.map((item, index) => (
            <DropdownMenuItem key={index} className="flex items-center gap-x-5">
              <div className="max-w-[10vw]">
                <p>{item.text}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
