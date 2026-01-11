"use client";

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
import { Loader2, Pencil, PlusCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import SelectVisibility from "../AboutSection/UserAboutForms/select-visibility";
import Link from "next/link";
import { getUserAboutInfo } from "@/data/get-user-about-info";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/Switch";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const EditDetailsModal = ({
  user,
  userdetails,
  isfetchingUserDetails,
  refetch,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [switchData, setSwitchData] = useState({
    workplace: false,
    highschool: false,
    college: false,
    hometown: false,
    currentcity: false,
    relationstatus: false,
  });

  useEffect(() => {
    if (userdetails?.ProfileAboutInfoVisibility) {
      const vis = userdetails.ProfileAboutInfoVisibility;
      setSwitchData({
        workplace: vis.workplace ?? false,
        highschool: vis.highschool ?? false,
        college: vis.college ?? false,
        hometown: vis.hometown ?? false,
        currentcity: vis.currentcity ?? false,
        relationstatus: vis.relationstatus ?? false,
      });
    }
  }, [userdetails]);

  const handleToggleSwitch = (label, val) => {
    setSwitchData((prevData) => ({
      ...prevData,
      [label]: val,
    }));
  };

  const { mutate: handleSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
      const { res } = await axios.post(
        "/api/userProf/about/aboutinfovisibility",
        switchData
      );
      return res;
    },
    onError: (err) => {
      console.log(err);
      return toast({
        title: "There was an error",
        description: "Couldn't not edit your details, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        {isfetchingUserDetails && (
          <div className="flex items-center justify-center px-4 h-[40vh]">
            <Loader2 className="w-12 h-12 text-neutral-600 animate-spin my-10 mr-1" />
          </div>
        )}

        {!isfetchingUserDetails && (
          <SimpleBar style={{ maxHeight: "60vh" }} className="pl-8 pr-4">
            <p className="text-neutral-700 text-sm">
              Details you select will be{" "}
              <span className="font-semibold">Public</span> and appear at the
              top of your profile.
            </p>

            <div className="mt-6 flex flex-col space-y-5">
              <div>
                <h1 className="font-semibold">Work</h1>
                {userdetails && (
                  <div className="flex items-center justify-between  gap-x-6">
                    <div className="flex items-center   gap-x-6">
                      <Switch
                        checked={switchData.workplace}
                        onCheckedChange={(val) =>
                          handleToggleSwitch("workplace", val)
                        }
                        className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                      />
                      <div className="relative flex items-center gap-x-1">
                        <p className="text-[14px]">
                          Former {userdetails?.workplace.position} at
                        </p>
                        <p className="text-[14px] font-medium">
                          {userdetails?.workplace.companyname}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" className="hover:bg-transparent">
                      <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                    </Button>
                  </div>
                )}
                <Link
                  href={`/user/${user.id}/about_work_and_education`}
                  className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
                >
                  <PlusCircle className="text-blue-600 h-8 w-8" />
                  <p className="text-blue-600">Add Workplace</p>
                </Link>
              </div>

              <div className="flex flex-col">
                <h1 className="font-semibold">Education</h1>
                {userdetails && (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between  gap-x-6">
                      <div className="flex items-center   gap-x-6">
                        <Switch
                          checked={switchData.college}
                          onCheckedChange={(val) =>
                            handleToggleSwitch("college", val)
                          }
                          className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                        />
                        <div className="relative flex items-center gap-x-1">
                          <p className="text-[14px]">Studied at</p>
                          <p className="text-[14px] font-medium">
                            {userdetails?.college.collegename}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" className="hover:bg-transparent">
                        <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between  gap-x-6">
                      <div className="flex items-center   gap-x-6">
                        <Switch
                          checked={switchData.highschool}
                          onCheckedChange={(val) =>
                            handleToggleSwitch("highschool", val)
                          }
                          className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                        />
                        <div className="relative flex items-center gap-x-1">
                          <p className="text-[14px]">Went to</p>
                          <p className="text-[14px] font-medium">
                            {userdetails?.highschool.schoolname}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" className="hover:bg-transparent">
                        <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                      </Button>
                    </div>
                  </div>
                )}
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
                {userdetails ? (
                  <div className="flex items-center justify-between  gap-x-6">
                    <div className="flex items-center   gap-x-6">
                      <Switch
                        checked={switchData.currentcity}
                        onCheckedChange={(val) =>
                          handleToggleSwitch("currentcity", val)
                        }
                        className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                      />
                      <div className="relative flex items-center gap-x-1">
                        <p className="text-[14px]">Lives in</p>
                        <p className="text-[14px] font-semibold">
                          {userdetails?.currentcity}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" className="hover:bg-transparent">
                      <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                    </Button>
                  </div>
                ) : (
                  <Link
                    href={`/user/${user.id}/about_places`}
                    className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
                  >
                    <PlusCircle className="text-blue-600 h-8 w-8" />
                    <p className="text-blue-600">Add current city</p>
                  </Link>
                )}
              </div>

              <div>
                <h1 className="font-semibold">Hometown</h1>
                {userdetails ? (
                  <div className="flex items-center justify-between  gap-x-6">
                    <div className="flex items-center   gap-x-6">
                      <Switch
                        checked={switchData.hometown}
                        onCheckedChange={(val) =>
                          handleToggleSwitch("hometown", val)
                        }
                        className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                      />
                      <div className="relative flex items-center gap-x-1">
                        <p className="text-[14px]">From</p>
                        <p className="text-[14px] font-semibold">
                          {userdetails?.hometown}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" className="hover:bg-transparent">
                      <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                    </Button>
                  </div>
                ) : (
                  <Link
                    href={`/user/${user.id}/about_places`}
                    className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
                  >
                    <PlusCircle className="text-blue-600 h-8 w-8" />
                    <p className="text-blue-600">Add hometown</p>
                  </Link>
                )}
              </div>

              <div>
                <h1 className="font-semibold">Relationship</h1>
                {userdetails ? (
                  <div className="flex items-center justify-between  gap-x-6">
                    <div className="flex items-center   gap-x-6">
                      <Switch
                        checked={switchData.relationstatus}
                        onCheckedChange={(val) =>
                          handleToggleSwitch("relationstatus", val)
                        }
                        className=" data-[state=unchecked]:bg-neutral-600 data-[state=checked]:bg-blue-500"
                      />
                      <div className="relative">
                        <p className="text-[14px]">
                          {userdetails?.relationstatus}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" className="hover:bg-transparent">
                      <Pencil className="fill-neutral-800 text-white h-7 w-7" />
                    </Button>
                  </div>
                ) : (
                  <Link
                    href={`/user/${user.id}/about_family_and_relationship`}
                    className="w-full flex items-center justify-start gap-x-6 p-0 pt-2 font-normal text-[15px] hover:bg-transparent"
                  >
                    <PlusCircle className="text-blue-600 h-8 w-8" />
                    <p className="text-blue-600">Add relation status</p>
                  </Link>
                )}
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
          </SimpleBar>
        )}

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
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="p-0 px-8 h-9 bg-blue-600 flex items-center gap-x-1"
            >
              {isSubmitting && (
                <Loader2 className="w-5 h-5 text-white animate-spin my-10 mr-1" />
              )}
              <span className="text-[15px] font-semibold">Save</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDetailsModal;
