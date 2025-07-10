"use client";

import React from "react";
import { Checkbox } from "../ui/Checkbox";
import { Archive, Trash, Undo2 } from "lucide-react";
import { Button } from "../ui/Button";

const TrashPosts = ({ trashPosts }) => {
  console.log(trashPosts, "trash posts");
  return (
    <div className="mx-20 w-full">
      <h1 className="text-center bg-neutral-300 py-2">
        Items in your trash are only visible to you.
      </h1>

      <div className="bg-white drop-shadow-[0px_0px_3px_rgba(0,0,0,0.2)] flex items-center justify-between p-4 rounded-md mt-4">
        <div className="flex items-center">
          <Checkbox className="border-2 dark:border-neutral-50 h-5 w-5 mr-4 " />
          <p>All</p>
        </div>

        <div className="flex gap-x-4">
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Archive className="w-5 h-5" />
            <p>Archive</p>
          </Button>
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Undo2 className="w-5 h-5" />
            <p>Restore</p>
          </Button>
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Trash className="w-5 h-5" />
            <p>Delete</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrashPosts;
