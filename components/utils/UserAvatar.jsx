import React from "react";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icons";
import ToolTipComp from "./ToolTipComp";

const UserAvatar = ({ post, user, ...props }) => {
  return (
    <ToolTipComp
      content="Account"
      user={user}
      post={post}
      className={"cursor-pointer"}
    >
      <Avatar {...props}>
        {user?.image ? (
          <div className="relative aspect-square h-full w-full outline-none">
            <Image
              src={user.image}
              alt="profile image"
              fill
              priority={true}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback className="bg-neutral-200">
            <span className="sr-only">{user?.name}</span>
            <div className="h-full w-full">
              <Image
                src="/user.png"
                fill
                className="h-full w-full"
                alt="User avatar"
              />
            </div>
          </AvatarFallback>
        )}
      </Avatar>
    </ToolTipComp>
  );
};

export default UserAvatar;
