import UserAbout from "@/components/UserProfile/AboutSection/user-about";
import { db } from "@/lib/db";
import React from "react";

const UserProfileAboutPage = async ({ params }) => {
  const user = await db.user.findFirst({
    where: {
      id: params?.userId,
    },
    include: {
      blogs: true,
    },
  });

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 px-60 py-5 h-screen">
      <UserAbout />
    </div>
  );
};

export default UserProfileAboutPage;
