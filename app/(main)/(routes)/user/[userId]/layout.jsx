import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import StickDiv from "@/components/UserProfile/sticky_div";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";
import { cache, Suspense } from "react";

const getUserProfileData = cache(async (userId) => {
  const user = await db.userProfile.findFirst({
    where: {
      id: userId,
    },

    select: {
      id: true,
      type: true,
      name: true,
      bio: true,
      image: true,
      categories: true,
      backgroundImage: true,
    },
  });

  if (!user) return null;

  if (user.backgroundImage) {
    const coverPhotoBlog = await db.blog.findFirst({
      where: {
        image: {
          path: ["url"],
          equals: user.backgroundImage,
        },
      },
      select: { id: true },
    });

    user.coverPhotoId = coverPhotoBlog?.id;
  } else {
    user.coverPhotoId = null;
  }

  return user;
});

async function ProfileWrapper({ params }) {
  const { userId } = await params;

  const user = await getUserProfileData(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();

    await utapi.deleteFiles(image[0].key);
  };

  return (
    <div>
      <ProfileBanner user={user} deleteImage={deleteImage} />
      <StickDiv user={user} />
    </div>
  );
}

const Layout = async ({ children, params }) => {
  return (
    <div className="relative h-full">
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfileWrapper params={params} />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
