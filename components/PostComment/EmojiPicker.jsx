"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const EmojiPicker = ({ onChange, triggerClassName }) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full p-2 cursor-pointer",
          triggerClassName
        )}
      >
        <Smile className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition" />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
