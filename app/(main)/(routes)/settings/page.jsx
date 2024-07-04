import ProfileForm from "@/components/SettingsComponent/ProfileForm";
import { Input } from "@/components/ui/Input";
import { getAuthSession } from "@/lib/auth";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

import React from "react";

const settings = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="px-[6vw] pt-5">
      <div className="bg-white dark:bg-neutral-800 py-2 px-10 rounded-lg shadow-md">
        <div className="py-5 px-5">
          <h1 className="dark:text-white font-bold text-xl">
            Find the setting you need
          </h1>
          <div className="relative flex items-center my-4">
            <Search className="absolute left-4 h-8 w-8 text-gray-500 z-10 dark:text-gray-200 " />
            <Input
              placeholder="Search settings"
              className="py-8 pl-14 font-light focus-visible:ring-transparent rounded-md text-sm bg-gray-100 dark:bg-neutral-900 dark:border-0 dark:placeholder:text-neutral-200"
            />
          </div>
        </div>

        <div className="px-5">
          <h1 className="dark:text-white font-bold text-lg">
            Most visited settings
          </h1>

          <div className="grid grid-cols-3 gap-x-6 mt-2">
            <div className="bg-gray-200 dark:bg-neutral-900 rounded-md flex items-center flex-col py-12 space-y-5">
              <img src="/ImageIcons/block.png" className="h-16 w-16" />
              <div className="pt-4 mx-5">
                <h1 className="dark:text-neutral-100 font-medium">Blocking</h1>
                <p className="dark:text-neutral-300 text-sm text-justify">
                  Review people you&apos;ve previously blocked or add someone to
                  your blocked list.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-neutral-900 rounded-md flex items-center flex-col py-12 space-y-5">
              <img src="/ImageIcons/contract.png" className="h-16 w-16" />
              <div className="pt-4 mx-5">
                <h1 className="dark:text-neutral-100 font-medium">
                  Activity log
                </h1>
                <p className="dark:text-neutral-300 text-sm text-justify">
                  View and manage your activity.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-neutral-900 rounded-md flex items-center flex-col py-12 space-y-5">
              <img src="/ImageIcons/light-bulb.png" className="h-16 w-16" />
              <div className="pt-4 mx-5">
                <h1 className="dark:text-neutral-100 font-medium">Dark mode</h1>
                <p className="dark:text-neutral-300 text-sm text-justify">
                  Choose if you to use dark mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pt-5 mb-2">
          <h1 className="dark:text-white font-bold text-lg">
            Look for something else ?
          </h1>

          <div className="mt-2 space-y-5">
            <div className="bg-gray-200 dark:bg-neutral-900 rounded-md flex items-center py-5 px-10">
              <img src="/ImageIcons/padlock.png" className="h-[6em] w-[6em]" />
              <div className="mx-5">
                <h1 className="dark:text-neutral-100 font-medium">
                  Privacy center
                </h1>
                <p className="dark:text-neutral-300 text-sm text-justify">
                  Learn how to manage and control your privacy across Meta
                  products.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-neutral-900 rounded-md flex items-center py-5 px-10">
              <img src="/ImageIcons/ux.png" className="h-[6em] w-[6em]" />
              <div className="mx-5">
                <h1 className="dark:text-neutral-100 font-medium">
                  Help Center
                </h1>
                <p className="dark:text-neutral-300 text-sm text-justify">
                  Learn how to manage and control your privacy across Meta
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default settings;
