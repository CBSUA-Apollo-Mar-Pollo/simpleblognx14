import React, { useMemo, useState } from "react";
import { DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { ArrowLeft, Search } from "lucide-react";
import { Separator } from "../ui/Separator";
import { Input } from "../ui/Input";
import { postFeelings } from "@/constants/post_feelings";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const PostFeelingsSelection = ({
  setIsFeelingSelectionActive,
  setUserStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter feelings based on search term
  const filteredFeelings = useMemo(() => {
    if (!searchTerm) return postFeelings;
    return postFeelings.filter((feeling) =>
      feeling.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <>
      <DialogHeader className="pt-4 px-4">
        <DialogTitle className="text-xl font-bold text-center">
          How are you feeling?
        </DialogTitle>

        <Button
          variant="ghost"
          onClick={() => setIsFeelingSelectionActive(false)}
          className="p-0 rounded-full"
          asChild
        >
          <ArrowLeft className="w-10 h-10 absolute left-4 top-1 cursor-pointer p-2 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 " />
        </Button>
      </DialogHeader>

      <Separator className="dark:bg-neutral-700 border-1" />

      <div className=" mb-3">
        <div className="flex gap-x-2 px-4">
          <Button
            variant="ghost"
            className="font-semibold text-blue-500 border-b-4 border-blue-500 rounded-none"
          >
            Feelings
          </Button>
          <Button variant="ghost" className="font-semibold">
            Activities
          </Button>
        </div>

        <div className="relative  items-center hidden xl:flex mt-3 mx-3 mb-4 ">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="h-9 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
          />
        </div>

        <SimpleBar
          forceVisible="y"
          style={{ maxHeight: "62vh", minHeight: "62vh" }}
        >
          <div className="grid grid-cols-2 gap-y-3  mx-3">
            {filteredFeelings.length > 0 ? (
              filteredFeelings.map((feeling, index) => (
                <Button
                  onClick={() => {
                    (setIsFeelingSelectionActive(false),
                      setUserStatus(feeling));
                  }}
                  key={index}
                  variant="ghost"
                  className="flex justify-start gap-x-3 mr-4 hover:bg-neutral-200 py-6"
                >
                  <p className="text-xl bg-neutral-300 p-1.5 rounded-full">
                    {feeling.emoji}
                  </p>
                  <p className="font-normal">{feeling.label}</p>
                </Button>
              ))
            ) : (
              <p className="col-span-2 text-center text-[16px] text-neutral-500 py-6">
                Nothing found
              </p>
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default PostFeelingsSelection;
