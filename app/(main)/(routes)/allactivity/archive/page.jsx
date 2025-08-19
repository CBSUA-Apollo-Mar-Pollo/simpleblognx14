import AllActivitySideBar from "@/components/allactivity/all-activity-sidebar";
import Link from "next/link";
import React, { Suspense } from "react";

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
  );
};

const ArchivePage = () => {
  return (
    <div className="flex">
      <Suspense fallback={<LoadingFallback />}>
        <AllActivitySideBar />
      </Suspense>
      <div className="mx-20 w-full">ArchivePage</div>
    </div>
  );
};

export default ArchivePage;
