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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AccountForm = ({ user }) => {
  const [date, setDate] = useState();
  const [name, setName] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: updateAccount, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        name: name.length === 0 ? user.name : name,
        date: date || user.birthdate,
      };

      const { data } = await axios.post("/api/settings/account", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
      if (err.response?.status === 401) {
        window.location.replace("/");
      }
      if (err.response?.status === 406) {
        return toast({
          title: "Not allowed",
          description: err.response?.data,
          variant: "destructive",
        });
      }
      //  if there are any other errors beside the server error
      toast({
        title: "There was an error",
        description: "Could not update you account",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        description: "Account profile has been updated",
        variant: "success",
      });
    },
  });
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-sm text-gray-500">Update your account settings.</p>
      </div>
      <Separator className="my-5" />

      {/* name */}
      <div className="my-2">
        <h3 className="text-base font-medium py-2 pl-1">Name</h3>
        <Input
          placeholder={user.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
        />
        <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
          This is the name that will be displayed on your profile and in emails.
        </p>
      </div>

      {/* Birth date */}
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
              {user?.birthdate && date === undefined ? (
                <>{format(user.birthdate, "PPP")}</>
              ) : (
                <>{date ? format(date, "PPP") : <span>Pick a date</span>}</>
              )}
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
        <Button
          isLoading={isLoading}
          disabled={date === undefined && name.length === 0}
          onClick={() => updateAccount()}
        >
          Update Account
        </Button>
      </div>
    </div>
  );
};

export default AccountForm;
