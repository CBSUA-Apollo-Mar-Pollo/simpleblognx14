import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React from "react";

const UserAboutPlacesLived = () => {
  return (
    <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
      <div className="space-y-6">
        <h1 className="font-semibold">Place lived</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add current city</p>
        </Button>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add hometown</p>
        </Button>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add city</p>
        </Button>
      </div>
    </div>
  );
};

export default UserAboutPlacesLived;
