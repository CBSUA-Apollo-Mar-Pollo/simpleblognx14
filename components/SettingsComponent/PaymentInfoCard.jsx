"use client";

import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useSession } from "next-auth/react";

const PaymentInfoCard = ({ data }) => {
  const { data: session } = useSession();
  return (
    <div className="bg-white drop-shadow-md dark:bg-neutral-800 px-10 mt-5 py-10 rounded-2xl mx-32">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          className="h-14 w-14"
          user={{
            name: session?.user?.name || null,
            image: session?.user?.image || null,
          }}
        />
        <div>
          <p className="dark:text-neutral-200 font-medium">
            {session?.user?.name}
          </p>
          <span className="dark:text-neutral-200 text-sm">
            {session?.user?.email}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-md font-bold dark:text-neutral-200  my-4">
          Payment methods
        </h1>
        <div className="mt-4  bg-white drop-shadow rounded-2xl">
          <Button
            variant="ghost"
            className="w-full   bg-white border border-neutral-200 dark:border-0 px-6 flex text-blue-400 rounded-xl justify-between py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Add debit or credit card
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-md font-bold dark:text-neutral-200">
          Shipping info
        </h1>
        <p className="dark:text-white text-sm">Manage your shipping details</p>
        <div className="mt-4  bg-white drop-shadow-md rounded-2xl">
          <Button
            variant="ghost"
            className="w-full   bg-white border border-neutral-200 dark:border-0 px-6 mt-5 rounded-none rounded-t-xl flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Shipping address
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            className="w-full  bg-white border border-neutral-200 dark:border-0 px-6  rounded-none flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Email
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            className="w-full  bg-white border border-neutral-200 dark:border-0 px-6  rounded-none rounded-b-xl flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Phone number
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
