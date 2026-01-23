import UserAbout from "@/components/UserProfile/AboutSection/user-about";
import { db } from "@/lib/db";
import React, { cache, Suspense } from "react";

const getUserProfileAboutData = cache(async (userId) => {
  const user = await db.userProfile.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      type: true,
      name: true,
      handleName: true,
      bio: true,
      image: true,
      categories: true,
      backgroundImage: true,
    },
  });

  return user;
});

async function ProfileAboutInfoWrapper({ userId, about }) {
  const user = await getUserProfileAboutData(userId);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 px-60 py-5 min-h-screen">
      <UserAbout user={user} aboutTab={about} />
    </div>
  );
}

const UserProfileAboutPage = async ({ params }) => {
  const { userId, about } = await params;

  return (
    <Suspense fallback={<div className="text-black">Loading...</div>}>
      <ProfileAboutInfoWrapper userId={userId} about={about} />
    </Suspense>
  );
};

export default UserProfileAboutPage;
