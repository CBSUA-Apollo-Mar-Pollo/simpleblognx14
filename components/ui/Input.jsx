import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ suffix, className, type, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute right-3 top-2.5 flex items-center justify-cente cursor-pointer">
        {suffix}
      </div>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
