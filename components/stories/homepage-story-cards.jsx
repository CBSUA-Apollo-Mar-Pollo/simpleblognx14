"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HomePageStoryCards = ({ session }) => {
  const router = useRouter();
  const handleNavigate = () => {
    return router.push("/stories/create");
  };
  return (
    <div className="overflow-x-hidden pb-1">
      <button
        onClick={() => handleNavigate()}
        className="relative border w-44 rounded-2xl bg-white drop-shadow hover:bg-neutral-100 hover:opacity-85 hover:cursor-pointer ease-in-out duration-100"
      >
        <Image
          sizes="100vw"
          width={0}
          height={0}
          src={session?.user.image}
          alt="profile image"
          className="w-44 h-52 object-cover rounded-t-2xl bg-white "
        />

        <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Plus className="bg-blue-700 text-white h-10 w-10 rounded-full border-4" />
        </div>

        <div className="pt-8 pb-2 border-t">
          <p className="text-[14px] font-semibold text-center">Create story</p>
        </div>
      </button>
    </div>
  );
};

export default HomePageStoryCards;
