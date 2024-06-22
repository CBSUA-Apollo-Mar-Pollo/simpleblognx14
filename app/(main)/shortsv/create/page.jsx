import CreateShortsv from "@/components/shortsv/CreateShortsv";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const CreateShortsvPage = async () => {
  const session = await getAuthSession();
  return <CreateShortsv session={session} />;
};

export default CreateShortsvPage;
