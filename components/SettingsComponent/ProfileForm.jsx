"use client";

import React, { useState } from "react";
import { Separator } from "../ui/Separator";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import UserAvatar from "../utils/UserAvatar";
import { Plus } from "lucide-react";

const ProfileForm = ({ user }) => {
  console.log(user);
  const [handleName, setHandleName] = useState("");
  const [bio, setBio] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        handleName:
          handleName.length !== 0 ? "@" + handleName : user.handleName,
        bio: bio || user.bio,
      };

      const { data } = await axios.post("/api/settings/profile", payload);
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
        description: "Could not update you profile",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        description: "Profile has been updated",
        variant: "success",
      });
    },
  });
  return (
    <div className="bg-white dark:bg-neutral-800 px-10 mt-4 py-5 rounded-md mx-32">
      <div>
        <h1 className="text-2xl font-bold text-neutral-200">Profile</h1>
        <p className="text-sm text-neutral-200">Manage your profile info.</p>
      </div>

      <div className="px-10">
        {/* profile picture */}
        <div className="my-2">
          <div className="flex flex-col justify-center items-center space-y-4">
            <UserAvatar
              className="h-[20vh] w-[10vw]"
              user={{ name: user.name || null, image: user.image || null }}
            />
            <Button className="rounded-b-none flex gap-x-4 px-10">
              <Plus className="h-5 w-5" />
              Upload new photo
            </Button>
          </div>
        </div>
        {/* username */}
        <div className="my-4">
          <h3 className=" text-lg font-bold  dark:text-neutral-100 my-2">
            Name
          </h3>
          <div className="relative grid grid-cols-3">
            <div className="relative">
              <h3 className="absolute top-2 left-2 z-20  text-[12px] font-normal  dark:text-neutral-300  pl-1">
                First name
              </h3>
              <Input
                placeholder={user.handleName ? user.handleName : ``}
                className={` focus-visible:ring-transparent focus:outline-0 rounded-none rounded-tl border border-gray-300 dark:border-neutral-500  pt-10 pb-6  font-medium`}
              />
            </div>
            <div className="relative">
              <h3 className="absolute top-2 left-2 z-20  text-[12px] font-normal dark:text-neutral-300   pl-1">
                Middle name
              </h3>
              <Input
                placeholder={user.handleName ? user.handleName : ``}
                className={` focus-visible:ring-transparent focus:outline-0 rounded-none border border-gray-300 dark:border-neutral-500  pt-10 pb-6  font-medium`}
              />
            </div>
            <div className="relative">
              <h3 className="absolute top-2 left-2 z-20  text-[12px] font-normal dark:text-neutral-300   pl-1">
                Last name
              </h3>
              <Input
                placeholder={user.handleName ? user.handleName : ``}
                className={` focus-visible:ring-transparent focus:outline-0  rounded-none rounded-tr  border border-gray-300 dark:border-neutral-500  pt-10 pb-6  font-medium`}
              />
            </div>
          </div>
          <div className="relative">
            <h3 className="absolute top-2 left-2 z-20  text-[12px] font-normal dark:text-neutral-300  pl-1">
              Handle name
            </h3>
            <Input
              placeholder={user.handleName ? user.handleName : ``}
              className={` focus-visible:ring-transparent focus:outline-0 rounded-t-none border border-gray-300 dark:border-neutral-500  pt-10 pb-6  font-medium`}
              value={handleName}
              onChange={(e) => setHandleName(e.target.value)}
            />
            <p className="text-xs text-neutral-200 font-medium mt-2 ml-2">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p>
          </div>
        </div>
        {/* bio */}
        <div className="my-2">
          <h3 className="text-base font-medium py-2 pl-1 dark:text-neutral-200">
            Bio
          </h3>
          <div className="relative">
            <Input
              placeholder={user.bio ? user.bio : ``}
              className="focus-visible:ring-transparent focus:outline-0  border border-gray-300 dark:border-neutral-500  py-5 font-normal"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        {/* verified email */}
        <div className="my-7">
          <h3 className="text-base font-medium py-2 pl-1 dark:text-neutral-200">
            Email
          </h3>
          <Select>
            <SelectTrigger className="focus-visible:ring-transparent dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 focus:border-gray-400 focus:border-2 py-5 text-sm text-gray-600 dark:text-neutral-50 font-medium">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={user.email}>{user.email}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-neutral-200 font-medium mt-2 ml-2">
            You can manage verified email addresses in your email settings.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          isLoading={isLoading}
          disabled={handleName.length === 0 && bio.length === 0}
          onClick={() => updateProfile()}
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
