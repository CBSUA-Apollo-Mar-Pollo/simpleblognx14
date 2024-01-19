"use client";

import React from "react";
import { Button } from "./ui/Button";
import {
  Album,
  Book,
  CakeSlice,
  Church,
  Cpu,
  FlaskConical,
  HomeIcon,
  LineChart,
  MessageSquareMore,
  Palette,
  Plane,
  Save,
  ThumbsUp,
  Tv,
  User,
} from "lucide-react";
import { Separator } from "./ui/Separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed start-0 h-screen z-10shadow-sm w-80 px-4 max-h-[90vh] overflow-auto">
      <div className="space-y-2 pt-10">
        <Button
          variant="ghost"
          className={cn(
            pathname === "/" ? "bg-gray-200" : "",
            "flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
          )}
        >
          <HomeIcon className="mr-4 text-gray-500 h-6" />
          <span className="text-sm text-gray-600 font-semibold">Home</span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Album className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Post</span>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            pathname === "/LikedPosts" ? "bg-gray-200" : "",
            "flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
          )}
        >
          <ThumbsUp className="mr-4 text-gray-500 h-6" />
          <span className="text-sm text-gray-600 font-semibold">
            Liked Posts
          </span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Save className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">
            Saved Posts
          </span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <MessageSquareMore className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Comments</span>
        </Button>
      </div>
      <Separator className="my-3 bg-gray-300" />

      {/* Explore */}
      <h1 className="font-bold text-xl ml-2">Explore</h1>

      <div className="space-y-2 mt-2 mb-2">
        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <User className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Personal</span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <LineChart className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Business</span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Tv className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">
            Television
          </span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Palette className="mr-4 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Art</span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Church className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">
            Culture,Race and Ethnicity
          </span>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Book className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">
            Reading,Writing, Literature
          </span>
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <CakeSlice className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Food</span>
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <FlaskConical className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Science</span>
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Plane className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">Travel</span>
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent"
        >
          <Cpu className="mr-2 text-gray-500 h-7" />
          <span className="text-sm text-gray-600 font-semibold">
            Technology
          </span>
        </Button>
      </div>

      <span
        className="text-xs font-medium mt-7 text-slate-600
      "
      >
        EStoryamo, Inc,&#169; 2024, All rights reserved.
      </span>
    </div>
  );
};

export default Sidebar;
