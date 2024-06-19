import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";

const PersonalDetailsCard = () => {
  return (
    <div className="bg-white drop-shadow-md dark:bg-neutral-800 px-10 mt-5 py-10 rounded-2xl mx-32">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold dark:text-neutral-200">
          Personal details
        </h1>
        <p className="text-[14px] dark:text-neutral-200">
          Estorya uses this information to verify your identity and to keep our
          community safe. You decide what personal details you make visible to
          others.
        </p>
      </div>

      <div className="mt-4  bg-white drop-shadow-md rounded-2xl">
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 flex rounded-none rounded-t-2xl justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Contact info
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none  flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Birthday
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none  flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Identity confirmation
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none rounded-b-2xl flex flex-col items-start dark:text-white py-10 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Account ownership and control
          <span className="flex justify-between items-center w-full">
            <p className="text-xs font-normal">
              Manage your data, modify your legacy contact, deactivate or delete
              your account and profile.
            </p>
            <ChevronRight />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
