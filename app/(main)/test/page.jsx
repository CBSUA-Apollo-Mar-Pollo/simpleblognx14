import Testcomponent from "@/components/testcomponent";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const test = async () => {
  const user = await getAuthSession();

  console.log(user);
  return (
    <div>
      Test Page
      <Testcomponent />
    </div>
  );
};

export default test;
