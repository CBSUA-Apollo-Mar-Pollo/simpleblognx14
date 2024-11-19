import React from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Eye, Globe, Lock, WholeWord } from "lucide-react";

const ModalPage4 = ({ selectedVisibility, setSelectedVisibility }) => {
  return (
    <div>
      <DialogHeader className="ml-4 mt-4">
        <DialogTitle className="font-bold text-2xl">
          What kind of community is this?
        </DialogTitle>
        <DialogDescription className="text-black text-sm">
          Decide who can view and contribute in your community.Only public
          communities show up in search.{" "}
          <span className="font-semibold">Important</span>: Once set, you will
          need to submit a request to change your community type.
        </DialogDescription>
      </DialogHeader>

      <div className="mb-20">
        <RadioGroup
          value={selectedVisibility}
          onValueChange={setSelectedVisibility}
          className="ml-8 mr-14 mt-5"
          defaultValue="public"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-6">
              <Globe className="h-6 w-6" />
              <div className="flex flex-col">
                <p className="font-bold">Public</p>
                <span className="text-[13px] -mt-1">
                  Anyone can view post, and comment to this community.
                </span>
              </div>
            </div>
            <RadioGroupItem value="public" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-6">
              <Eye className="h-6 w-6" />
              <div className="flex flex-col">
                <p className="font-bold">Restricted</p>
                <span className="text-[13px] -mt-1">
                  Anyone can view, But only approved users can contribute.
                </span>
              </div>
            </div>
            <RadioGroupItem value="restricted" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-6">
              <Lock className="h-6 w-6" />
              <div className="flex flex-col">
                <p className="font-bold">Private</p>
                <span className="text-[13px] -mt-1">
                  Only approved users can view and contribute.
                </span>
              </div>
            </div>
            <RadioGroupItem value="private" />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ModalPage4;
