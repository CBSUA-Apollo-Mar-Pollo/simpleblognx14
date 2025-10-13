import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React from "react";

const UserAboutLifeEvents = () => {
  return (
    <div className="col-span-6 px-4 pt-10 pb-4 space-y-6">
      <div className="space-y-1">
        <h1 className="font-semibold">Life events</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-4 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add a life event</p>
        </Button>
      </div>
    </div>
  );
};

export default UserAboutLifeEvents;
