"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // Assuming you have variants, if not, you might not have this
        // ... existing variants
      },
      size: {
        // ADD THIS BLOCK
        default: "h-5 w-[40px] data-[state=checked]:bg-primary", // Default size
        sm: "h-5 w-9 data-[state=checked]:bg-primary", // Small size
        lg: "h-7 w-14 data-[state=checked]:bg-primary", // Large size
      },
    },
    defaultVariants: {
      size: "default",
      // ... existing default variant for 'variant' if applicable
    },
  }
);

function Switch({ className, size = "default", ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        switchVariants({ size }), // Pass the size to switchVariants
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
          // Adjust size and position classes based on the 'size' prop
          size === "sm" && "size-4 data-[state=checked]:translate-x-3", // Small thumb: size-4, translate-x-3 (9 - 2*2 - 4 = 1)
          size === "lg" && "size-6 data-[state=checked]:translate-x-7", // Large thumb: size-6, translate-x-7 (14 - 2*2 - 6 = 4)
          size === "default" &&
            "size-[18px] data-[state=checked]:translate-x-[18px]" // Default thumb: size-5, translate-x-5 (11 - 2*2 - 5 = 2)
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
