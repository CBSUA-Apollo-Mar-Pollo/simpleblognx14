import { Separator } from "@/components/ui/Separator";
import React from "react";

const page = () => {
  return (
    <div className="mt-24 px-10">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account settings </p>
      </div>

      <Separator className="my-4" />

      <div className="grid px-10"></div>
    </div>
  );
};

export default page;
