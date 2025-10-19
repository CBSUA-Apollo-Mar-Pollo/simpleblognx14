import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import { ArrowLeft, X } from "lucide-react";
import React, { useState } from "react";

const SelectVisibility = ({ selectedAudience, setSelectedAudience }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center bg-neutral-200 gap-x-2 h-10"
        >
          <Icons.earthIcon className="h-3.5 w-3.5" />
          <span className=" font-semibold">Public</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[30vw] [&>button]:hidden p-0 bg-white drop-shadow-[0px_20px_10px_rgba(0,0,0,0.2)] ">
        <DialogHeader className="">
          <DialogTitle className="text-xl font-bold text-center pt-5">
            Select audience
          </DialogTitle>
          <DialogClose asChild>
            <X className="w-9 h-9 absolute right-4 top-3 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
          </DialogClose>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700 border-1 p-0 m-0" />

        <div className="px-2 max-h-[50vh] overflow-y-auto">
          <RadioGroup
            value={selectedAudience}
            onValueChange={(value) => setSelectedAudience(value)}
            className="pl-1 pr-2 space-y-1"
          >
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
              <RadioGroupItem
                value="Public"
                id="public"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
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
              <RadioGroupItem
                value="friends"
                id="friends"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
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
                    Don&apos;t show to some friends
                  </p>
                </div>
              </div>
              <RadioGroupItem
                value="exceptions"
                id="exceptions"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
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
              <RadioGroupItem
                value="specificfriends"
                id="specificfriends"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
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
              <RadioGroupItem
                value="onlyme"
                id="onlyme"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
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
              <RadioGroupItem
                value="custom"
                id="custom"
                className=" h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5 "
              />
            </label>
          </RadioGroup>
        </div>

        <Separator className="dark:bg-neutral-700 border-1" />

        <DialogFooter className="px-2 pb-3">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="ghost"
            className="text-blue-600 hover:bg-neutral-200 hover:text-blue-600"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-blue-600 text-white p-0 px-8 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectVisibility;
