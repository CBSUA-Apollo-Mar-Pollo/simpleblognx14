import {
  Archive,
  Bookmark,
  MessageSquareWarning,
  MoreHorizontal,
  Pen,
  Pin,
  Trash2,
  X,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Separator } from "../ui/Separator";
import { useSession } from "next-auth/react";

const PostOption = ({ authorId, authorName }) => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
          <MoreHorizontal />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className=" relative rounded-md min-w-[15rem] text-neutral-700 dark:text-neutral-200 dark:bg-neutral-800 drop-shadow-[0px_0px_7px_rgba(0,0,0,0.20)] p-2 border-0"
        align="end"
      >
        <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 flex items-start">
          <span className="">
            <Pin />
          </span>
          <span className="font-bold ">Pin post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 flex items-start">
          <span className="mt-0.5">
            <Bookmark />
          </span>
          <div>
            <h6 className="font-bold">Save post</h6>
            <span className="text-xs">Add this to your saved items</span>
          </div>
        </DropdownMenuItem>
        {session?.user?.id === authorId && (
          <>
            <DropdownMenuItem className="cursor-pointer gap-x-2 py-2">
              <span className="">
                <Pen />
              </span>
              <span className="font-bold ">Edit post</span>
            </DropdownMenuItem>

            <Separator className="my-2" />

            <DropdownMenuItem className="cursor-pointer gap-x-2 py-2">
              <span className="">
                <Archive />
              </span>

              <h6 className="font-bold">Move to archive</h6>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 flex items-start">
              <span className="mt-0.5">
                <Trash2 />
              </span>
              <div>
                <h6 className="font-bold">Move to trash</h6>
                <span className="text-xs">
                  Items in your trash are deleted after 30 days{" "}
                </span>
              </div>
            </DropdownMenuItem>
          </>
        )}

        {session?.user?.id !== authorId && (
          <>
            <Separator className="my-2" />

            <DropdownMenuItem className="cursor-pointer gap-x-2 py-2">
              <span className="">
                <MessageSquareWarning />
              </span>
              <div>
                <h6 className="font-bold">Report post</h6>
                <span className="text-xs">
                  We won&apos;t let {authorName.split(" ")[0]} know who reported
                  this{" "}
                </span>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOption;
