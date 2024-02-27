import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import Image from "next/image";
import { CalendarDays, MoreHorizontal } from "lucide-react";
import { formatBirthdate } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Icons } from "./Icons";
const ToolTipComp = ({ children, className, content, user, post }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={`${className}`}>
          {children}
        </TooltipTrigger>
        {user && post ? (
          <TooltipContent className="dark:bg-neutral-800 dark:border-0 rounded-xl pb-3">
            <div className=" flex gap-x-2 px-4 mt-2">
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
                      <Image src="/user.png" fill className="h-full w-full" />
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
                  <Icons.BioIcon className="h-4 w-4" />
                  <span className="font-medium">{user.bio}</span>
                </div>
              </div>
            )}
            <div className="w-full flex gap-x-2 mt-2">
              <Button className="w-full bg-blue-500">Follow</Button>
              <Button className="w-full bg-neutral-800">Chat</Button>
              <Button className=" bg-neutral-800">
                <MoreHorizontal />
              </Button>
            </div>
          </TooltipContent>
        ) : (
          <TooltipContent>{content}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipComp;
