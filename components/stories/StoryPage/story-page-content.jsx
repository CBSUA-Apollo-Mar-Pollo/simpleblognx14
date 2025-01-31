"use client";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import ChatBoxMenu from "@/components/utils/ChatBoxMenu";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import React from "react";

const StoryPageContent = ({ session }) => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2">
        <Menu contentClassName="-mr-32" />
        <ChatBoxMenu />
        <NotificationMenu />
        <UserAccountNav user={session.user} />
      </div>
    </div>
  );
};

export default StoryPageContent;
