import Navbar from "@/components/utils/Navbar";
import React, { Suspense } from "react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const getNavbarData = unstable_cache(
  async (userId) => {
    const user = await db.user.findFirst({
      where: { id: userId },
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
    return user;
  },
  ["navbar-data"], // cache key
  { revalidate: 3600 } // revalidate every hour
);

async function NavbarWrapper() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return <Navbar profiles={[]} />;
  }

  const user = await getNavbarData(session.user.id);
  const profiles = user
    ? [user, ...user.pages, user.owner].filter(Boolean)
    : [];

  return <Navbar profiles={profiles} />;
}

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarWrapper />
      </Suspense>
      {children}
    </>
  );
}

function NavbarSkeleton() {
  return (
    <div className="h-16 bg-gray-200 animate-pulse">
      {/* Skeleton for your navbar */}
    </div>
  );
}
