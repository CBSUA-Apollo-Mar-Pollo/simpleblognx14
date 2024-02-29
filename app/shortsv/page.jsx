import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { db } from "@/lib/db";
import React from "react";

const shortsVPage = async () => {
  const shortsVideo = await db.shortsv.findMany({
    take: 1,
    include: {
      author: true,
    },
  });

  return <ShortsvCard video={shortsVideo[0]} />;
};

export default shortsVPage;
