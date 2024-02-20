import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileButtons = ({ userId }) => {
  const pathname = usePathname();
  return (
    <ul className="flex justify-end text-neutral-800 pt-2">
      <Link
        href={`/user/${userId}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),

          `px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold  py-5 ${
            pathname === `/user/${userId}` &&
            "border-b-4 rounded-none border-blue-600 text-blue-600"
          }`
        )}
      >
        Posts
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold py-5"
      >
        About
      </Button>
      <Link
        href={`/user/${userId}/photos`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold  py-5 ${
            pathname === `/user/${userId}/photos` &&
            "border-b-4 rounded-none border-blue-600 text-blue-600"
          }`
        )}
      >
        Photos
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold py-5"
      >
        More
      </Button>
    </ul>
  );
};

export default ProfileButtons;
