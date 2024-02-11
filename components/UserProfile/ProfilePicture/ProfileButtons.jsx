import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileButtons = ({ userId }) => {
  const pathname = usePathname();
  return (
    <ul className="flex justify-end text-neutral-800 py-1">
      <Link
        href={`/user/${userId}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
        )}
      >
        Post
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
      >
        About
      </Button>
      <Link
        href={`/user/${userId}/photos`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
        )}
      >
        Photos
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
      >
        More
      </Button>
    </ul>
  );
};

export default ProfileButtons;
