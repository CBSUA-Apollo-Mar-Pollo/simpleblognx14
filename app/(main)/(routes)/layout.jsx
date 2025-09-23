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

  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      id: true,
      name: true,
      bio: true,
      email: true,
      image: true,
    },
  });
  const pages = await db.page.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const profiles = [user, ...pages];

  return (
    <div className="h-full ">
      <Suspense>
        <Navbar profiles={profiles} />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
