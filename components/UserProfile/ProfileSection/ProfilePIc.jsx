import UserAvatar from "@/components/utils/UserAvatar";
import React from "react";
import UpdateProfilePicModal from "./UpdateProfilePicModal";

const ProfilePIc = ({ user, session }) => {
  return (
    <div className="absolute bottom-0 top-[22vw] left-[4vw]">
      <div className="relative">
        <UserAvatar
          className="h-44 w-44 border-4 border-neutral-50"
          user={{
            name: user?.name || null,
            image: user?.image || null,
          }}
        />
        {session?.user.id === user.id &&
        !user.image?.includes("googleusercontent.com") ? (
          <div className="bg-neutral-300 absolute bottom-4 hover:bg-neutral-400 right-0 rounded-full py-1 px-1 h-10">
            <UpdateProfilePicModal userId={user.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePIc;
