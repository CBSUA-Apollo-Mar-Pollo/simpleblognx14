import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./Input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Input
      suffix={
        showPassword ? (
          <EyeIcon
            onClick={() => setShowPassword(false)}
            className="text-slate-500 w-5 h-5 select-none"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setShowPassword(true)}
            className="text-slate-500 w-5 h-5 select-none"
          />
        )
      }
      type={showPassword ? "text" : "password"}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
