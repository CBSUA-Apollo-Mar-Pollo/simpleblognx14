import UserAbout from "@/components/UserProfile/AboutSection/user-about";
import { db } from "@/lib/db";
import React from "react";

const UserProfileAboutPage = async ({ params }) => {
  const user = await db.user.findFirst({
    where: {
      id: params?.userId,
    },
    select: {
      id: true,
      type: true,
      name: true,
      bio: true,
      email: true,
      image: true,
      category: true,
    },
  });

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 px-60 py-5 min-h-screen">
      <UserAbout user={user} />
    </div>
  );
};

export default UserProfileAboutPage;
