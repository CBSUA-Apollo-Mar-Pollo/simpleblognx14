import React from "react";
import { Separator } from "./ui/Separator";
import { Input } from "./ui/Input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Button } from "./ui/Button";

const ProfileForm = ({ user }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-500">
          This is how others will see you on site
        </p>
      </div>
      <Separator className="my-5" />

      {/* username */}
      <div className="my-2">
        <h3 className="text-base font-medium py-2 pl-1">Username</h3>
        <Input
          placeholder={user.username ? user.username : `Optional`}
          className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
        />
        <p className="text-xs text-gray-600 font-medium mt-2 ml-2">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
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
        <Button>Update Profile</Button>
      </div>
    </div>
  );
};

export default ProfileForm;
