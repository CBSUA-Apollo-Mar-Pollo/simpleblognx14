import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import StickDiv from "@/components/UserProfile/sticky_div";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";
import { unstable_cache } from "next/cache"; // 1. Import caching utility

const getUserProfileData = unstable_cache(
  async (userId) => {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },

      select: {
        blogs: true,
        id: true,
        type: true,
        name: true,
        bio: true,
        email: true,
        image: true,
        category: true,
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
  },
  ["user-profile-data"],
  {
    revalidate: 3600,
    tags: ["user-profile"],
  }
);

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
    <div className="relative h-full">
      <ProfileBanner user={user} deleteImage={deleteImage} />
      <StickDiv user={user} />
      {children}
    </div>
  );
};

export default Layout;
