import PageCreationComponent from "@/components/page/creation-page/page-creation-component";
import PageCreationContentPreview from "@/components/page/creation-page/page-creation-initial-content-preview";
import PageCreationSideBar from "@/components/page/creation-page/page-creation-initial-sidebar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: `Estorya | Page creation`,
  description: "All in one social media app",
};

const PageCreation = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return <PageCreationComponent session={session} />;
};

export default PageCreation;
