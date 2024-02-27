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
    <div>
      <div>
        <h1 className="text-2xl font-bold">Customize profile</h1>
        <p className="text-sm text-gray-500">Profile information</p>
      </div>
      <Separator className="my-5" />

      {/* username */}
      <div className="my-2">
        <h3 className="text-base font-medium py-2 pl-1">Handle name</h3>
        <div className="relative">
          <Input
            placeholder={user.handleName ? user.handleName : ``}
            className={`focus-visible:ring-transparent focus:outline-0  border border-gray-300  py-5   font-medium`}
            value={handleName}
            onChange={(e) => setHandleName(e.target.value)}
          />
          <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>
      </div>
      {/* bio */}
      <div className="my-2">
        <h3 className="text-base font-medium py-2 pl-1">Bio</h3>
        <div className="relative">
          <Input
            placeholder={user.bio ? user.bio : ``}
            className="focus-visible:ring-transparent focus:outline-0  border border-gray-300  py-5 font-normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>

      {/* verified email */}
      <div className="my-7">
        <h3 className="text-base font-medium py-2 pl-1">Email</h3>
        <Select>
          <SelectTrigger className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 text-sm text-gray-600 font-medium">
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={user.email}>{user.email}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
          You can manage verified email addresses in your email settings.
        </p>
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
