import { Button } from "@/components/ui/Button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Dot } from "lucide-react";
import React from "react";

const ModalPage2 = ({
  watchedFieldCommunityName,
  watchedFieldCommunityDescription,
}) => {
  return (
    <div>
      <DialogHeader className="ml-4 mt-4">
        <DialogTitle className="font-bold text-2xl">
          Style your community
        </DialogTitle>
        <DialogDescription className="text-black">
          Add visual flair will catch potential members attention and help
          establish your community's culture!
        </DialogDescription>
        <DialogDescription className="text-black">
          You can edit this anytime.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-4 ml-7 mt-5">
        <div className="col-span-2 space-y-2 mt-4 mb-10">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Banner</span>
            <Button className="h-8 px-3 text-xs">Add</Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Icon</span>
            <Button className="h-8 px-3 text-xs">Add</Button>
          </div>
        </div>

        <div className=" mx-10 col-span-2">
          <div className="bg-neutral-100 rounded-2xl border border-neutral-200">
            <div className="py-4 px-4">
              <div className="flex items-start gap-x-4">
                <span className="bg-yellow-400 font-bold text-2xl rounded-full px-3 py-2 border-2 border-neutral-400 mt-1">
                  c/
                </span>
                <div>
                  <h3 className="font-semibold text-xl">
                    {watchedFieldCommunityName
                      ? "c/" + watchedFieldCommunityName
                      : "Community name"}
                  </h3>
                  <div className="flex items-center text-xs font-medium">
                    <span>1 member</span>
                    <Dot />
                    <span>1 online</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-semibold text-neutral-600 mt-3">
                {watchedFieldCommunityDescription
                  ? watchedFieldCommunityDescription
                  : "Community description"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage2;
