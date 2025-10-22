import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Separator } from "@radix-ui/react-separator";
import { PlusCircle, X } from "lucide-react";
import React from "react";
import SelectVisibility from "../AboutSection/UserAboutForms/select-visibility";
import Link from "next/link";

const EditDetailsModal = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9"
        >
          Edit details
        </Button>
      </DialogTrigger>

      <DialogContent className="[&>button]:hidden p-0 min-w-[40vw]">
        <DialogHeader className="pt-4 relative">
          <DialogTitle className="text-center font-bold text-xl dark:text-neutral-200">
            Edit details
          </DialogTitle>
          <DialogClose asChild>
            <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
          </DialogClose>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-200" />

        <div className="px-8 max-h-[70vh] overflow-y-auto">
          <p className="text-neutral-700 text-sm">
            Details you select will be{" "}
            <span className="font-semibold">Public</span> and appear at the top
            of your profile.
          </p>

          <div className="mt-6 flex flex-col space-y-5">
            <div>
              <h1 className="font-semibold">Work</h1>
              <Link
                href={`/user/${user.id}/about_work_and_education`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add Workplace</p>
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <h1 className="font-semibold">Education</h1>
              <Link
                href={`/user/${user.id}/about_work_and_education`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add High school</p>
              </Link>
              <Link
                href={`/user/${user.id}/about_work_and_education`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add College</p>
              </Link>
            </div>

            <div>
              <h1 className="font-semibold">Current city</h1>
              <Link
                href={`/user/${user.id}/about_places`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add current city</p>
              </Link>
            </div>

            <div>
              <h1 className="font-semibold">Hometown</h1>
              <Link
                href={`/user/${user.id}/about_places`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add hometown</p>
              </Link>
            </div>

            <div>
              <h1 className="font-semibold">Relationship</h1>
              <Link
                href={`/user/${user.id}/about_family_and_relationship`}
                className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
              >
                <PlusCircle className="text-blue-600 h-8 w-8" />
                <p className="text-blue-600">Add relation status</p>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-semibold">Websites</h1>
                <p className="text-xs text-neutral-600">
                  To feature links on your profile, set the audience to{" "}
                  <span className="font-semibold">Public</span>.
                </p>
              </div>
              <SelectVisibility />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-semibold">Social links</h1>
                <p className="text-xs text-neutral-600">
                  To feature links on your profile, set the audience to{" "}
                  <span className="font-semibold">Public</span>.
                </p>
              </div>
              <SelectVisibility />
            </div>
          </div>
        </div>

        <div className="pb-4  pt-3 flex items-center justify-between px-4 border-t border-neutral-300">
          <Link
            href={`/user/${user.id}/about_overview`}
            className="text-sm font-semibold text-blue-600 ml-4"
          >
            Update Your information
          </Link>

          <div className="flex items-center gap-x-2">
            <Button className="p-0 px-3 h-9 bg-neutral-300 text-black">
              Cancel
            </Button>
            <Button className="p-0 px-8 h-9 bg-blue-600">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDetailsModal;
