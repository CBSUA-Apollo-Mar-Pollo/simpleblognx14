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
import EditPostModal from "./EditPostModal/edit-post-modal";
import { getSharedPost } from "@/actions/getSharedPost";
import { useQuery } from "@tanstack/react-query";
import MoveToTrashModal from "./move-to-trash-modal";

const PostOption = ({ blog, deleteImage, fetchNextPage }) => {
  const authorId = blog.author.id;
  const authorName = blog.author.name;
  const { data: session } = useSession();

  // get shared post data
  const { data: sharedPost } = useQuery({
    // Query key (unique identifier)
    queryKey: ["sharedPost", blog.sharedPostId],
    // Query function
    queryFn: async () => {
      const res = await getSharedPost(blog.sharedPostId);
      return res;
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
          <MoreHorizontal />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className=" relative rounded-md min-w-[15rem] dark:bg-neutral-800 drop-shadow-[0px_0px_7px_rgba(0,0,0,0.20)] p-2 border-0"
        align="end"
      >
        <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 flex items-start dark:hover:bg-neutral-600">
          <Pin className="dark:text-neutral-300 " />
          <span className="font-bold dark:text-neutral-300">Pin post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 flex items-start dark:hover:bg-neutral-600">
          <span className="mt-0.5">
            <Bookmark className="dark:text-neutral-300" />
          </span>
          <div>
            <h6 className="font-bold dark:text-neutral-300">Save post</h6>
            <span className="text-xs dark:text-neutral-300">
              Add this to your saved items
            </span>
          </div>
        </DropdownMenuItem>
        {session?.user?.id === authorId && (
          <>
            <EditPostModal
              blog={blog}
              sharedPost={sharedPost}
              deleteImage={deleteImage}
            />

            <Separator className="my-2" />

            <DropdownMenuItem className="cursor-pointer gap-x-2 py-2 dark:hover:bg-neutral-600">
              <Archive className="h-6 w-6 dark:text-neutral-300" />
              <h6 className="font-bold dark:text-neutral-300">
                Move to archive
              </h6>
            </DropdownMenuItem>

            <MoveToTrashModal
              blog={blog}
              session={session}
              fetchNextPage={fetchNextPage}
            />
          </>
        )}

        {session?.user?.id !== authorId && (
          <>
            <Separator className="my-2" />

            <DropdownMenuItem className=" flex items-start cursor-pointer gap-x-2 py-2 dark:hover:bg-neutral-600">
              <span className="mt-[3px] dark:text-neutral-300">
                <MessageSquareWarning />
              </span>
              <div>
                <h6 className="font-bold dark:text-neutral-300">Report post</h6>
                <span className="text-xs dark:text-neutral-300">
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
