import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React from "react";

const UserAboutDetails = () => {
  return (
    <div className="col-span-6 px-4 pt-10 pb-4 space-y-6">
      <div className="space-y-1">
        <h1 className="font-semibold">About you</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Write some details about yourself</p>
        </Button>
      </div>
      <div className="space-y-1">
        <h1 className="font-semibold">Name pronounciation</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add a name pronounciation</p>
        </Button>
      </div>
      <div className="space-y-1">
        <h1 className="font-semibold">Other names</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add a nickname, a birth name...</p>
        </Button>
      </div>
      <div className="space-y-1">
        <h1 className="font-semibold">Favorite qoutes</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add your favorite qoutations</p>
        </Button>
      </div>
    </div>
  );
};

export default UserAboutDetails;
