"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import {
  Bell,
  Book,
  Brush,
  Calendar,
  ChevronDown,
  Clock,
  Diamond,
  Gavel,
  LineChart,
  List,
  Lock,
  MenuSquare,
  MessageSquareWarning,
  Option,
  ScrollText,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import React, { useState } from "react";

const CommunitySideBar = ({ communityDetails }) => {
  const [toggleScrollBar, setToggleScrollBar] = useState(false);
  const handleScrollBar = () => {
    setToggleScrollBar(true);
  };
  const handleMouseLeave = () => {
    setToggleScrollBar(false);
  };

  return (
    <div
      className={`sticky top-[7vh]  z-0  max-h-[93vh] pb-3 sidebarContainer ${
        toggleScrollBar ? "overflow-auto" : "overflow-hidden"
      }  dark:bg-neutral-900 dark:text-neutral-100`}
      onMouseEnter={handleScrollBar}
      onMouseLeave={handleMouseLeave}
    >
      {/* community icon */}
      <div className="flex items-center gap-x-2 ml-4 mt-3">
        <UserAvatar
          className="h-12 w-12 "
          user={{
            image: communityDetails.icon || null,
          }}
        />

        <div className="flex flex-col">
          <span className="text-neutral-700 text-[18px] font-bold">
            {communityDetails.name}
          </span>
          <div className="flex items-center gap-x-1  text-neutral-600 -mt-1">
            <Lock className="h-3 w-3" />
            <p className="text-[13px] font-medium">
              {communityDetails.visibility} group
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-3">
        <Separator className="bg-neutral-300" />
      </div>

      <div className="mx-3 mt-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-neutral-800 text-lg ml-2">Overview</h3>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3   text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-2 space-y-2">
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <ScrollText className="h-6 w-6" />
            Post queue
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700  gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Calendar className="h-6 w-6" />
            Scheduled Posts and Events
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Gavel className="h-6 w-6" />
            Restricted Users
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Users className="h-6 w-6" />
            Admins and Members
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <LineChart className="h-6 w-6" />
            Insights
          </Button>
        </div>
      </div>

      <div className="mt-4 mx-3">
        <Separator className="bg-neutral-300" />
      </div>

      <div className="mx-3 mt-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-neutral-800 text-lg ml-2">
            Moderation
          </h3>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3   text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-2 space-y-2">
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <List className="h-6 w-6" />
            Community Rules
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700  gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <ShieldAlert className="h-6 w-6" />
            Community Status
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <MessageSquareWarning className="h-6 w-6" />
            Member reported content
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Clock className="h-6 w-6" />
            Activity log
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Diamond className="h-6 w-6" />
            Community Roles
          </Button>
        </div>
      </div>

      <div className="mt-4 mx-3">
        <Separator className="bg-neutral-300" />
      </div>

      <div className="mx-3 mt-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-neutral-800 text-lg ml-2">Settings</h3>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3   text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-2 space-y-2">
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Settings className="h-6 w-6" />
            General Settings
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700  gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <MenuSquare className="h-6 w-6" />
            Posts and Comments
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Brush className="h-6 w-6" />
            Look and Feel
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Book className="h-6 w-6" />
            Community Guide
          </Button>
          <Button
            variant="ghost"
            className="text-neutral-700 gap-x-3 w-full flex justify-start text-[13px]  dark:text-neutral-50 dark:font-light"
          >
            <Bell className="h-6 w-6" />
            Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySideBar;
