import React from "react";
import { toast } from "./use-toast";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const useCustomHooks = () => {
  const sharingPostToast = () => {
    const { dismiss } = toast({
      title: "Sign in required",
      description: "You need to Sign in first",
      variant: "destructive",
      action: (
        <>
          <div>Share on your profile</div>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "ghost" }, "text-blue-500")}
            onClick={() => dismiss()}
          >
            View post
          </Link>
        </>
      ),
    });
  };
  return { sharingPostToast };
};

export default useCustomHooks;
