import PageCreationSideBar from "@/components/page/creation-page/sidebar";
import React from "react";

const PageCreation = () => {
  return (
    <div className="grid grid-cols-9">
      <div className="col-span-2 bg-white drop-shadow-xl">
        <PageCreationSideBar />
      </div>
      <div className="col-span-7 bg-neutral-100 h-screen"></div>
    </div>
  );
};

export default PageCreation;
