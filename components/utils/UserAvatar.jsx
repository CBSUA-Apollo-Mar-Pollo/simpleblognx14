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
          <AvatarFallback className="text-4xl font-bold bg-yellow-500 text-yellow-800 px-2   rounded-full">
            {/* <Image
                src="/user.png"
                fill
                className="h-full w-full"
                alt="User avatar"
              /> */}

            {user?.name[0].toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
    </ToolTipComp>
  );
};

export default UserAvatar;
