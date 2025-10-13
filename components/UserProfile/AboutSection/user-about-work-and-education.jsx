"use client";

import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React from "react";

const UserAboutWorkAndEducation = () => {
  return (
    <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
      <div className="space-y-4">
        <h1 className="font-semibold">Work</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add a workspace</p>
        </Button>
      </div>
      <div className="space-y-4">
        <h1 className="font-semibold">College</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add college</p>
        </Button>
      </div>
      <div className="space-y-4">
        <h1 className="font-semibold">High School</h1>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add highschool</p>
        </Button>
      </div>
    </div>
  );
};

export default UserAboutWorkAndEducation;
