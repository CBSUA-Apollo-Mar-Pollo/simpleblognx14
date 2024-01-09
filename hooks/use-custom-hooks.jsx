import React from "react";
import { toast } from "./use-toast";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const useCustomHooks = () => {
  const signinToast = () => {
    const { dismiss } = toast({
      title: "Sign in required",
      description: "You need to Sign in first",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "secondary" })}
          onClick={() => dismiss()}
        >
          Sign in
        </Link>
      ),
    });
  };
  return { signinToast };
};

export default useCustomHooks;
