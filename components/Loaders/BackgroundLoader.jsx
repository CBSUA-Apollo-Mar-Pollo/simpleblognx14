import { Loader2 } from "lucide-react";
import React from "react";

const BackgroundLoader = ({ loaderDescription }) => {
  return (
    <div className="fixed top-0 bg-neutral-900 flex items-center justify-center h-screen w-screen opacity-95 z-[60]">
      <div className="flex items-center justify-center gap-x-2 text-lg">
        <Loader2 className="w-6 h-6  animate-spin text-white" />
        <span className="text-white">{loaderDescription}...</span>
      </div>
    </div>
  );
};

export default BackgroundLoader;
