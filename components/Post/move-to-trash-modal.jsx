import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Trash2, X } from "lucide-react";
import { Separator } from "../ui/Separator";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { trashPost } from "@/actions/trashPost";
import { useToast } from "@/hooks/use-toast";

const MoveToTrashModal = ({ blog, session, fetchNextPage }) => {
  const queryClient = useQueryClient();
  const handleMoveToTrash = async (postId) => {
    // 🔁 Update cache locally
    queryClient.setQueryData(["get-posts-infinite-query"], (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.map((post) =>
            post.id === postId ? { ...post, trashed: true } : post
          )
        ),
      };
    });

    // Call server action to mark post as trashed
    await trashPost(postId, session);

    // fire function below so that post lists will not be stucked
    fetchNextPage();
  };

  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <div className="px-2 cursor-pointer gap-x-2 py-2 flex items-start hover:bg-gray-100 dark:hover:bg-neutral-600">
          <span className="mt-0.5">
            <Trash2 className="h-6 w-6 dark:text-neutral-300" />
          </span>
          <div>
            <h6 className="font-bold dark:text-neutral-300 text-sm">
              Move to trash
            </h6>
            <span className="text-xs dark:text-neutral-300">
              Items in your trash are deleted after 30 days{" "}
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="[&>button]:hidden p-0  drop-shadow-[0px_0px_5px_rgba(0,0,0,0.20)]">
        <DialogHeader className="pt-4 relative">
          <DialogTitle className="text-center font-bold text-xl">
            Move to your trash?
          </DialogTitle>
          <DialogClose asChild>
            <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 rounded-full" />
          </DialogClose>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-400" />

        <div className="mx-5 mb-4">
          <p className="text-sm">
            Items in your trash will be automatically deleted after 30 days. You
            can delete them from your trash earlier by going to activity log in
            settings.
          </p>

          <div className="mt-4 flex justify-end w-full gap-x-2">
            <Button variant="ghost" className="text-blue-600 font-semibold">
              Cancel
            </Button>
            <Button
              onClick={() => handleMoveToTrash(blog.id)}
              className="bg-blue-600 w-28"
            >
              Move
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveToTrashModal;
