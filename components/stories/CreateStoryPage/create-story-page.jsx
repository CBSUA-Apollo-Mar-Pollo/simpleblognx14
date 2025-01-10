"use client";

import React, { useState } from "react";
import CreateStoryPageSidebar from "./create-storypage-sidebar";
import CraeateStoryPageContent from "./create-storypage-content";

const CreateStoryPage = ({ session }) => {
  const [toggleAddText, setToggleAddText] = useState(false);
  const [image, setImage] = useState(null);
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <CreateStoryPageSidebar
          session={session}
          setToggleAddText={setToggleAddText}
          image={image}
        />
      </div>

      <div className="col-span-8 bg-white ">
        <CraeateStoryPageContent
          session={session}
          toggleAddText={toggleAddText}
          image={image}
          setImage={setImage}
        />
      </div>
    </div>
  );
};

export default CreateStoryPage;
