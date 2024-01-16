"use client";

import React, { useState } from "react";
import { Separator } from "./ui/Separator";
import { Input } from "./ui/Input";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/Calendar";
import { format } from "date-fns";
import { Button } from "./ui/Button";

const AccountForm = ({ user }) => {
  const [date, setDate] = useState();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-sm text-gray-500">Update your account settings.</p>
      </div>
      <Separator className="my-5" />

      {/* username */}
      <div className="my-2">
        <h3 className="text-base font-medium py-2 pl-1">Name</h3>
        <Input
          placeholder={user.name}
          className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
        />
        <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
          This is the name that will be displayed on your profile and in emails.
        </p>
      </div>

      {/* verified email */}
      <div className="my-7">
        <h3 className="text-base font-medium py-2 pl-1">Date of Birth</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-between text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={date}
              onSelect={setDate}
              fromYear={1960}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
          Your date of birth is used to calculate your age.
        </p>
      </div>

      <div className="flex justify-end">
        <Button>Update Account</Button>
      </div>
    </div>
  );
};

export default AccountForm;
