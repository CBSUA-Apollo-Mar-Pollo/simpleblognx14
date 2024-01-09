import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icons";

const UserAvatar = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <div className="relative aspect-square h-full w-full outline-none">
          <Image
            fill
            src={user.image}
            alt="profile image"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
