import { Button } from "@/components/ui/Button";
import { ArrowLeft, Search } from "lucide-react";
import React from "react";

const ProfileMenu = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <Button className="bg-transparent">
            <ArrowLeft className="text-black" />
          </Button>
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        <Button className="bg-transparent">
          <Search className="text-black" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileMenu;
