import UserProfile from "@/components/UserProfile/UserProfile";
import { db } from "@/lib/db";
import React from "react";

const UserProfilePage = async ({ params }) => {
  const user = await db.user.findFirst({
    where: {
      id: params.userId,
    },
    include: {
      blogs: true,
    },
  });

  return <UserProfile user={user} />;
};

export default UserProfilePage;
