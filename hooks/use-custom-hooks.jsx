import React from "react";
import { toast } from "./use-toast";
import Link from "next/link";

const useCustomHooks = () => {
  const signinToast = () => {
    const { dismiss } = toast({
      title: "Sign in required",
      description: "You need to Sign in first",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          className="bg-neutral-200 px-4 py-2 rounded-md hover:bg-neutral-300"
          onClick={() => dismiss()}
        >
          <span className="text-neutral-800 text-sm font-semibold">
            Sign in
          </span>
        </Link>
      ),
    });
  };
  return { signinToast };
};

export default useCustomHooks;
