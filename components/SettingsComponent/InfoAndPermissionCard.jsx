import React from "react";
import { Button } from "../ui/Button";
import { ChevronRight } from "lucide-react";

const InfoAndPermissionCard = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 px-10 mt-5 py-10 rounded-md mx-32">
      <h1 className="text-2xl font-bold text-neutral-200">
        Your Information and Permission
      </h1>

      <div className="mt-6">
        <Button
          variant="ghost"
          className="w-full px-6 flex rounded-none rounded-t-2xl justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Access your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full px-6 rounded-none flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Download your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full px-6 rounded-none  flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Transfer a copy of your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full px-6 rounded-none rounded-b-2xl flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Search history
          <ChevronRight />
        </Button>
        <p className="text-[13px] text-neutral-200 mt-2 pl-4">
          View, download or transfer your information and activity on our app.
        </p>
      </div>
    </div>
  );
};

export default InfoAndPermissionCard;
