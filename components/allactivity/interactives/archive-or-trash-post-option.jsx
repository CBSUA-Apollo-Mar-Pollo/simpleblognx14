"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Separator } from "@/components/ui/Separator";
import { Archive, MoreHorizontal, Trash2, Undo2, X } from "lucide-react";
import { useState } from "react";

const ArchiveOrTrashPostOption = ({
  postId,
  postImage,
  handleDeleteSinglePost,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleRestoreSinglePost,
  isRestorePostModalOpen,
  setIsRestorePostModalOpen,
}) => {
  const [isDropDownMenuOptionsOpen, setIsDropDownMenuOptionsOpen] =
    useState(false);
  return (
    <DropdownMenu
      open={isDropDownMenuOptionsOpen}
      onOpenChange={setIsDropDownMenuOptionsOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full px-2 bg-neutral-200 dark:bg-neutral-700 dark:text-white hover:bg-neutral-300 text-black ">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="left"
        className="min-w-[20vw] dark:bg-neutral-700 dark:border-0"
      >
        <div className="flex flex-col items-start justify-start">
          <Button className="w-full flex items-center justify-start gap-x-2 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black hover:bg-neutral-200">
            <Archive className="w-6 h-6 dark:text-neutral-200" />
            <span className="font-semibold dark:text-neutral-200">
              Move to archive
            </span>
          </Button>
          <Dialog
            open={isRestorePostModalOpen}
            onOpenChange={setIsRestorePostModalOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full flex items-center justify-start gap-x-2 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black hover:bg-neutral-200">
                <Undo2 className="w-6 h-6 dark:text-neutral-200" />
                <span className="font-semibold dark:text-neutral-200">
                  Restore to profile
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="[&>button]:hidden p-0 dark:bg-neutral-900 dark:border-0 min-w-[35vw]">
              <DialogHeader className="pt-4 relative">
                <DialogTitle className="text-center font-bold text-xl dark:text-neutral-200">
                  Restore to Profile?
                </DialogTitle>
                <DialogClose asChild>
                  <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                </DialogClose>
              </DialogHeader>

              <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-400" />

              <p className="px-8 text-[15px] pb-2 text-justify dark:text-neutral-200">
                Items you restore to your profile can be seen by the audience
                that was selected before they were moved to trash.
              </p>

              <div className="w-full flex items-end justify-end gap-x-1 p-3">
                <Button
                  onClick={() => setIsRestorePostModalOpen(false)}
                  variant="ghost"
                  className="text-blue-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleRestoreSinglePost(postId),
                      setIsDropDownMenuOptionsOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-10"
                >
                  Restore
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full flex items-center justify-start gap-x-2 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black hover:bg-neutral-200">
                <Trash2 className="w-6 h-6 dark:text-neutral-200" />
                <span className="font-semibold dark:text-neutral-200">
                  Delete
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="[&>button]:hidden p-0 dark:bg-neutral-900 dark:border-0 min-w-[35vw]">
              <DialogHeader className="pt-4 relative">
                <DialogTitle className="text-center font-bold text-xl dark:text-neutral-200">
                  Delete?
                </DialogTitle>
                <DialogClose asChild>
                  <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                </DialogClose>
              </DialogHeader>

              <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-400" />

              <p className="px-4 pb-2 dark:text-neutral-200">
                items you delete can't be restored.
              </p>

              <div className="w-full flex items-end justify-end gap-x-1 p-3">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant="ghost"
                  className="text-blue-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteSinglePost(postId, postImage),
                      setIsDropDownMenuOptionsOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-10"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ArchiveOrTrashPostOption;
