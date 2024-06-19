import React from "react";
import { Button } from "../ui/Button";
import { ChevronRight } from "lucide-react";

const InfoAndPermissionCard = () => {
  return (
    <div className="bg-white  drop-shadow-md dark:bg-neutral-800 px-10 mt-5 py-10 rounded-2xl mx-32">
      <h1 className="text-2xl font-bold dark:text-neutral-200">
        Your Information and Permission
      </h1>

      <div className="mt-6  bg-white drop-shadow-md rounded-2xl">
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 flex rounded-none rounded-t-2xl justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Access your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Download your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none  flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Transfer a copy of your information
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none rounded-b-2xl flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Search history
          <ChevronRight />
        </Button>
      </div>
      <p className="text-[13px] dark:text-neutral-200 mt-2 pl-4">
        View, download or transfer your information and activity on our app.
      </p>
    </div>
  );
};

export default InfoAndPermissionCard;
