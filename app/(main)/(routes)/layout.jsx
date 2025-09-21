import Navbar from "@/components/utils/Navbar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React, { Suspense } from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const Layout = async ({ children }) => {
  const session = await getAuthSession();
  const pages = await db.page.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return (
    <div className="h-full ">
      <Suspense>
        <Navbar pages={pages} />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
