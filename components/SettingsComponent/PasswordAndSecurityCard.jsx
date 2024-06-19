import React from "react";
import { Button } from "../ui/Button";
import { ChevronRight } from "lucide-react";

const PasswordAndSecurityCard = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 drop-shadow-lg px-10 mt-5 py-10 rounded-2xl mx-32">
      <div>
        <h1 className="text-2xl font-bold dark:text-neutral-200">
          Password & Security
        </h1>
      </div>

      <div className="mt-5">
        <h1 className="font-bold dark:text-neutral-200">Login & recovery</h1>
        <p className="text-[13px] dark:text-neutral-200">
          Manage your password, login preferences and recovery methods.
        </p>

        <div className="mt-4  bg-white drop-shadow rounded-2xl">
          <Button
            variant="ghost"
            className="w-full bg-white border border-neutral-200 dark:border-0 px-6 flex rounded-none rounded-t-2xl justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Change password
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none rounded-b-2xl flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Two-factor authentication
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="font-bold dark:text-neutral-200">Security checks</h1>
        <p className="text-[13px] dark:text-neutral-200">
          Review security issues by running checks across devices and emails
          sent.
        </p>

        <div className="mt-4 bg-white drop-shadow-md rounded-2xl">
          <Button
            variant="ghost"
            className="w-full bg-white border border-neutral-200 dark:border-0 px-6 flex rounded-none rounded-t-2xl justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Where you're logged in
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Login alerts
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none rounded-b-2xl flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Recent emails
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordAndSecurityCard;
