"use client";

import { Suspense } from "react";

export const ClientWrapper = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
      }
    >
      {children}
    </Suspense>
  );
};
