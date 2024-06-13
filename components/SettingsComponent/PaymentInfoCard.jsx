import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

const PaymentInfoCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 px-10 mt-5 py-10 rounded-md mx-32">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          className="h-14 w-14"
          user={{
            name: data.user.name || null,
            image: data.user.image || null,
          }}
        />
        <div>
          <p className="text-neutral-200 font-medium">{data.user.name}</p>
          <span className="text-neutral-200 text-sm">{data.user.email}</span>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-md font-bold text-neutral-200  my-4">
          Payment methods
        </h1>
        <Button
          variant="ghost"
          className="w-full px-6 flex text-blue-400 rounded-xl justify-between py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Add debit or credit card
        </Button>
      </div>

      <div className="mt-6">
        <h1 className="text-md font-bold text-neutral-200">Shipping info</h1>
        <p className="text-white text-sm">Manage your shipping details</p>
        <Button
          variant="ghost"
          className="w-full px-6 mt-5 rounded-none rounded-t-xl flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Shipping address
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full px-6  rounded-none flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Email
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="w-full px-6  rounded-none rounded-b-xl flex justify-between text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Phone number
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
