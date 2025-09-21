import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Separator } from "@/components/ui/Separator";
import { ImagePlus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const PageCreationStepTwoSidebar = ({
  setSideBarStepProcessCounter,
  formValues,
  setOpenLeavePageModal,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center py-2 pl-3 gap-x-2">
        <Button
          onClick={() =>
            formValues ? setOpenLeavePageModal(true) : router.push("/")
          }
          className="p-2 bg-neutral-500 rounded-full"
        >
          <X className="text-white" />
        </Button>
        <Link href="/" className="font-bold">
          <span className=" px-3.5 py-[2px] rounded-full bg-yellow-500/80 text-[27px] ">
            E
          </span>
        </Link>
      </div>

      <Separator className="my-2" />

      <div className="pl-4 pt-3 flex-1 relative ">
        <div className="flex items-center">
          <Link
            href="/pages"
            className="hover:underline text-xs font-semibold text-neutral-700"
          >
            Step 2 of 4
          </Link>
        </div>

        <div className="mt-2">
          <div className="pr-6">
            <h1 className="font-bold text-xl">Customize your page</h1>
            <p className="text-sm text-justify text-neutral-600 font-light">
              Your profile picture is one of the first things people see.Try
              using your logo or an image people can easily associate with you.
            </p>
          </div>

          <SimpleBar forceVisible="y" style={{ maxHeight: "62vh" }}>
            <div
              className="py-10 mt-4 mr-4 border-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600  cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="dark:bg-neutral-700 py-2 px-2 rounded-full">
                    <ImagePlus className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-center font-semibold text-[15px] dark:text-neutral-100">
                    Add Photos/Videos
                  </p>
                  <span className="text-xs text-neutral-500    dark:text-neutral-400">
                    or drag and drop
                  </span>
                </div>
              </div>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                accept="image/*, video/*"
              />
            </div>
            <div
              className="py-10 mt-4 mr-4 border-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600  cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="dark:bg-neutral-700 py-2 px-2 rounded-full">
                    <ImagePlus className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-center font-semibold text-[15px] dark:text-neutral-100">
                    Add Cover photo
                  </p>
                  <span className="text-xs text-neutral-500    dark:text-neutral-400">
                    or drag and drop
                  </span>
                </div>
              </div>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                accept="image/*, video/*"
              />
            </div>

            <div className="mr-4 mt-4">
              <Button className="w-full h-9 bg-blue-600 hover:bg-blue-500">
                Add Action Button
              </Button>
            </div>
          </SimpleBar>

          <div
            className="absolute bottom-0 left-0 w-full px-3 py-2  z-20 bg-white   before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-2 
            before:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] before:pointer-events-none"
          >
            <h1 className="font-semibold">Page health:Needs work</h1>
            <p className="text-sm">
              Compared to similar Pages with high engagement.
            </p>
            <Progress value={80} className="h-2 my-2" />
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() =>
                  setSideBarStepProcessCounter((prevCount) => {
                    if (prevCount > 0) {
                      return prevCount - 1;
                    }
                    return prevCount;
                  })
                }
                className="w-full bg-neutral-300 hover:bg-neutral-400 text-black"
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setSideBarStepProcessCounter((prevCount) => {
                    return prevCount + 1;
                  })
                }
                className="w-full bg-blue-100 hover:bg-blue-300 text-blue-700"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationStepTwoSidebar;
