import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/Separator";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Icons } from "../utils/Icons";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";

const PostAudienceSelection = ({ setIsPostAudienceActive }) => {
  return (
    <>
      <DialogHeader className="pt-4 px-4">
        <DialogTitle className="text-xl font-bold text-center">
          Post audience
        </DialogTitle>

        <Button
          variant="ghost"
          onClick={() => setIsPostAudienceActive(false)}
          className="p-0 rounded-full"
          asChild
        >
          <ArrowLeft className="w-10 h-10 absolute left-4 top-1 cursor-pointer p-2 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 " />
        </Button>
      </DialogHeader>

      <Separator className="dark:bg-neutral-700 border-1" />

      <div className="px-2 max-h-[50vh] overflow-y-auto">
        <div className="px-2">
          <h1 className="font-semibold">Who can see your post? </h1>

          <p className="text-sm my-2 text-neutral-600">
            Your post will show up in Feed, on your profile and in search
            results.
          </p>

          <p className="text-sm text-neutral-600">
            Your default audience is set to Only me, but you can change the
            audience of this specific post.
          </p>
        </div>

        <RadioGroup defaultValue="Public" className="pl-1 pr-2 mt-4 space-y-1">
          <label
            htmlFor="public"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.earthIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Public</h1>
                <p className="text-sm text-neutral-600">
                  Anyone on or off Estorias
                </p>
              </div>
            </div>
            <RadioGroupItem value="public" id="public" />
          </label>
          <label
            htmlFor="friends"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.friendsOnlyIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Friends</h1>
                <p className="text-sm text-neutral-600">
                  Your friends on estorias
                </p>
              </div>
            </div>
            <RadioGroupItem value="friends" id="friends" />
          </label>
          <label
            htmlFor="exceptions"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.friendsExceptionIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Friends exceptions</h1>
                <p className="text-sm text-neutral-600">
                  Don't show to some friends
                </p>
              </div>
            </div>
            <RadioGroupItem value="exceptions" id="exceptions" />
          </label>
          <label
            htmlFor="specificfriends"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.SpecificFriendsIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Specific friends</h1>
                <p className="text-sm text-neutral-600">
                  Only to show to some friends
                </p>
              </div>
            </div>
            <RadioGroupItem value="specificfriends" id="specificfriends" />
          </label>
          <label
            htmlFor="onlyme"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.OnlyMeIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Only me</h1>
              </div>
            </div>
            <RadioGroupItem value="onlyme" id="onlyme" />
          </label>
          <label
            htmlFor="custom"
            className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
          >
            <div className="flex items-center gap-x-2">
              <Icons.CustomAudienceIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
              <div>
                <h1 className="font-semibold">Custom</h1>
                <p className="text-sm text-neutral-600">
                  Include and exclude friends and lists
                </p>
              </div>
            </div>
            <RadioGroupItem value="custom" id="custom" />
          </label>
        </RadioGroup>
      </div>

      <Separator className="dark:bg-neutral-700 border-1" />

      <div className="flex items-center gap-x-2 pl-3">
        <Checkbox id="setAsDefaultAudience" className="h-6 w-6" />
        <Label>set as default audience.</Label>
      </div>

      <DialogFooter className="px-2 pb-3">
        <Button
          variant="ghost"
          className="text-blue-600 hover:bg-neutral-200 hover:text-blue-600"
        >
          Cancel
        </Button>
        <Button
          variant="ghost"
          className="bg-blue-600 text-white p-0 px-8 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
};

export default PostAudienceSelection;
