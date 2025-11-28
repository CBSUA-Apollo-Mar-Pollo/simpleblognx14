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
      pages: {
        select: {
          id: true,
          name: true,
          category: true,
          image: true,
          bio: true,
          type: true,
          ownerId: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          bio: true,
          email: true,
          image: true,
        },
      },
    },
  });

  const profiles = [user, ...user.pages, user.owner].filter(Boolean);

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
