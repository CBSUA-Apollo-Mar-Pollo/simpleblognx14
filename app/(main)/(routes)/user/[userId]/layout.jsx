import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import StickDiv from "@/components/UserProfile/sticky_div";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";
import { cache } from "react";

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
    const coverPhotoBlog = await db.post.findFirst({
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

const Layout = async ({ children, params }) => {
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
    <div className="relative min-h-screen">
      <ProfileBanner user={user} deleteImage={deleteImage} />
      <StickDiv user={user} />
      {children}
    </div>
  );
};

export default Layout;
