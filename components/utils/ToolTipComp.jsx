"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import Image from "next/image";
import {
  CalendarDays,
  Loader2,
  MessageSquareMore,
  MoreHorizontal,
  Pencil,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { formatBirthdate } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Icons } from "./Icons";
import { useSession } from "next-auth/react";

import { checkIfIsAFriend } from "@/actions/checkIfIsAFriend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ToolTipComp = ({ children, className, content, user, post }) => {
  const { data: session } = useSession();

  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const { data: isAFriend, refetch } = useQuery({
    queryKey: ["isAFriend", user?.id],
    queryFn: async () => {
      const res = await checkIfIsAFriend(user.id);
      return res;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: handleCancelAndFriendRequest } = useMutation({
    mutationFn: async (request) => {
      const payload = {
        userId: user.id,
        request,
      };
      setIsRequestLoading(true);
      await axios.post("/api/friendRequest", payload);
    },
    onError: (err) => {
      refetch();
      setIsRequestLoading(false);
    },
    onSuccess: () => {
      refetch();
      setIsRequestLoading(false);
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={`${className}`}>
          {children}
        </TooltipTrigger>
        {user && post ? (
          <TooltipContent
            side="bottom"
            className="dark:bg-neutral-800 dark:border-0 rounded-xl pb-3 min-w-[25vw]"
          >
            <div className=" flex gap-x-2 px-4 mt-2 ">
              <Avatar className="h-20 w-20">
                {user?.image ? (
                  <div className="relative aspect-square h-full w-full outline-none">
                    <Image
                      fill
                      src={user.image}
                      alt="profile image"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <AvatarFallback className="bg-neutral-200">
                    <span className="sr-only">{user?.name}</span>
                    <div className="h-full w-full">
                      <Image
                        src="/user.png"
                        fill
                        className="h-full w-full"
                        alt="User avatar"
                      />
                    </div>
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1 className="ml-2 text-xl font-bold dark:text-white">
                  {user?.name}
                </h1>
                <h3 className="ml-2 text-normal font-normal dark:text-white">
                  {user?.handleName}
                </h3>
                <div className="flex items-start gap-x-2 dark:text-neutral-200 py-2 ml-2">
                  <CalendarDays className="mt-1" />
                  <span className="w-36">
                    Born on{" "}
                    {new Date(user.birthdate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {user?.bio && (
              <div className="mx-5 my-2">
                <div className="flex items-center gap-x-2">
                  <Icons.BioIcon className="h-4 w-4 dark:fill-white" />
                  <span className="font-medium dark:text-white">
                    {user.bio}
                  </span>
                </div>
              </div>
            )}

            <div className="w-full flex gap-x-2 mt-2 px-2">
              {session?.user.id !== user?.id ? (
                <>
                  {isAFriend === "onhold" ? (
                    <Button
                      onClick={() => handleCancelAndFriendRequest("false")}
                      className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center"
                    >
                      <span className="pr-2">
                        {isRequestLoading ? (
                          <Loader2 className="w-6 h-6  animate-spin text-white" />
                        ) : (
                          <UserX className="fill-white  h-5 w-5" />
                        )}
                      </span>
                      Cancel Request
                    </Button>
                  ) : isAFriend === true ? (
                    <Button className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center">
                      <span className="pr-2">
                        <UserCheck className="fill-white  h-5 w-5" />
                      </span>
                      Friends
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleCancelAndFriendRequest("onhold")}
                      className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center"
                    >
                      <span className="pr-2">
                        {isRequestLoading ? (
                          <Loader2 className="w-6 h-6  animate-spin text-white" />
                        ) : (
                          <UserPlus className="fill-white  h-5 w-5" />
                        )}
                      </span>
                      Add friend
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="flex-auto bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                  >
                    <MessageSquareMore className="w-5 h-5 mr-2" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    className="flex-auto bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-500">
                    <Pencil className="w-4 h-4 mr-3" />
                    Edit profile
                  </Button>
                  <Button className=" bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-500">
                    <MoreHorizontal />
                  </Button>
                </>
              )}
            </div>
          </TooltipContent>
        ) : (
          <TooltipContent side="bottom">{content}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipComp;
