import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Separator } from "@/components/ui/Separator";
import { Switch } from "@/components/ui/Switch";
import { Icons } from "@/components/utils/Icons";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const PageCreationStepFourSidebar = ({
  setSideBarStepProcessCounter,
  formValues,
  setOpenLeavePageModal,
  session,
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
            Step 4 of 4
          </Link>
        </div>

        <div className="mt-2">
          <div className="pr-6">
            <h1 className="font-bold text-xl">Stay informed about your Page</h1>
            <p className="text-sm text-justify text-neutral-600 font-light">
              Turn on these features to help make the most of page.You can
              change them anytime in settings
            </p>
          </div>

          <div className="flex items-start mr-5  mt-4">
            <Icons.bell className="h-20 w-20 mr-5" />
            <div className="mr-10">
              <h1 className="font-semibold">
                Page notifications on your profile
              </h1>
              <p className="text-sm text-neutral-500">
                Dont miss updates about your page PAGE while you're switched
                into your profile{" "}
                <span className="font-semibold">{session?.user?.name}</span>.
              </p>
            </div>
            <Switch className="mt-2" />
          </div>
        </div>

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
            <Button className="w-full bg-blue-100 hover:bg-blue-300 text-blue-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationStepFourSidebar;
