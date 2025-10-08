import UserAbout from "@/components/UserProfile/user-about";
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
    <div className="bg-neutral-200 dark:bg-neutral-900 px-60 py-5 ">
      <UserAbout />
    </div>
  );
};

export default UserProfileAboutPage;
