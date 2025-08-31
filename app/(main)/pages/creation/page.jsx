import PageCreationContentPreview from "@/components/page/creation-page/page-creation-content-preview";
import PageCreationSideBar from "@/components/page/creation-page/page-creation-sidebar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

export const metadata = {
  title: `Estorya | Page creation`,
  description: "All in one social media app",
};

const PageCreation = async () => {
  const session = await getAuthSession();
  return (
    <div className="grid grid-cols-9">
      <div className="col-span-2 bg-white drop-shadow-xl">
        <PageCreationSideBar />
      </div>
      <div className="col-span-7 bg-neutral-100 h-screen">
        <PageCreationContentPreview session={session} />
      </div>
    </div>
  );
};

export default PageCreation;
