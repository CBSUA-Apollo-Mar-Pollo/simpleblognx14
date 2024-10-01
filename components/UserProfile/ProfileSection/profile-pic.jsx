import UserAvatar from "@/components/utils/UserAvatar";
import React from "react";
import UpdateProfilePicModal from "./UpdateProfilePicModal";

const ProfilePic = ({ user, session }) => {
  return (
    <div className="absolute bottom-0 left-[4vw] z-10">
      <div className="relative">
        <UserAvatar
          className="h-44 w-44 border-4 border-neutral-50 dark:border-neutral-800"
          user={{
            name: user?.name || null,
            image: user?.image || null,
          }}
        />
        {session?.user.id === user.id &&
        !user.image?.includes("googleusercontent.com") ? (
          <div className="bg-neutral-300 absolute bottom-4 hover:bg-neutral-400 right-0 rounded-full py-1 px-1 h-10 dark:bg-neutral-700 dark:hover:bg-neutral-600">
            <UpdateProfilePicModal userId={user.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePic;
