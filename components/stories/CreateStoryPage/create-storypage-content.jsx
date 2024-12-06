import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Card, CardContent } from "@/components/ui/Card";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import { ALargeSmall } from "lucide-react";
import React from "react";

const CraeateStoryPageContent = ({ session }) => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2">
        <Menu contentClassName="-mr-32" />
        <NotificationMenu />
        <UserAccountNav user={session.user} />
      </div>

      <div className="flex items-center justify-center h-screen gap-x-4">
        <Card className="border-0">
          <CardContent className=" flex items-center justify-center h-[50vh] min-w-[15vw] bg-gradient-to-tl from-purple-300 to-blue-600 rounded-2xl hover:opacity-85 hover:cursor-pointer">
            <div className="flex flex-col items-center space-y-3">
              <img
                src="/ImageIcons/gallery.png"
                className="h-12 w-12 bg-white p-2 rounded-full  drop-shadow-[0px_0px_7px_rgba(0,0,0,0.5)]"
              />
              <span className="text-white font-semibold ">
                Create a photo story
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className=" flex items-center justify-center h-[50vh] min-w-[15vw] bg-gradient-to-br from-rose-300 to-pink-500 rounded-2xl hover:opacity-85 hover:cursor-pointer">
            <div className="flex flex-col items-center space-y-3">
              <ALargeSmall className="h-12 w-12 bg-white text-neutral-600 p-2 rounded-full  drop-shadow-[0px_0px_7px_rgba(0,0,0,0.5)]" />
              <span className="text-white font-semibold ">
                Create a text story
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CraeateStoryPageContent;
