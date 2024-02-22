import React from "react";
import { toast } from "./use-toast";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const useCustomHooks = () => {
  const signinToast = () => {
    const { dismiss } = toast({
      title: "Sign in required",
      description: "You need to Sign in first",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => dismiss()}
        >
          <span className="text-white">Sign in</span>
        </Link>
      ),
    });
  };
  return { signinToast };
};

export default useCustomHooks;
