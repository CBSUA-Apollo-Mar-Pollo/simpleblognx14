import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import StickDiv from "@/components/UserProfile/sticky_div";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";

const Layout = async ({ children, params }) => {
  const userId = params?.userId;
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      blogs: true,
    },
  });

  const getCoverPhoto = await db.blog.findMany({
    where: {
      AND: [
        { image: { not: null } }, // Ensure `image` is not null
        {
          image: {
            equals: {
              url: user?.backgroundImage, // Correctly reference the JSON key
            },
          },
        },
      ],
    },
  });

  user.coverPhotoId = getCoverPhoto[0]?.id;

  // delete image in upload thing if the user click the cancel button
  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image[0].key);
  };

  return (
    <div className="relative h-full">
      {/* user profile page header */}
      <ProfileBanner user={user} deleteImage={deleteImage} />

      <StickDiv user={user} />
      {/* content */}
      {children}
    </div>
  );
};

export default Layout;
