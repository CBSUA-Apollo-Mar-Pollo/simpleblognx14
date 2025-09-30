"use client";

import React, { useEffect, useState } from "react";
import StoryPageSidebar from "./story-page-sidebar";
import StoryPageContent from "./story-page-content";
import { useSession } from "next-auth/react";

const StoryPage = ({ id, stories }) => {
  const { data: session } = useSession();
  const currentStory = stories.find((story) => story.author.id === id);

  const [currentStoryBeingShown, setCurrentStoryBeingShown] = useState({
    Image: currentStory?.images[0]?.img,
    Author: currentStory?.author,
    imgLength: currentStory?.images.length,
    currentIndex: 0,
    imageIndex: 0,
  });

  useEffect(() => {
    // Reset currentStoryBeingShown when the story changes
    if (currentStory) {
      setCurrentStoryBeingShown({
        Image: currentStory?.images[0]?.img,
        Author: currentStory?.author,
        imgLength: currentStory?.images.length,
        currentIndex: 0,
        imageIndex: 0,
      });
    }
  }, [id, currentStory]);

  const goToNextImage = () => {
    setCurrentStoryBeingShown((prevState) => {
      const { currentIndex, imageIndex } = prevState;
      const currentObject = stories[currentIndex];
      const newImageIndex = imageIndex + 1;

      // If we are at the last image of the current story, go to the next story
      if (newImageIndex >= currentObject.images.length) {
        return {
          ...prevState,
          currentIndex: (currentIndex + 1) % stories.length, // Loop to the next story
          imageIndex: 0, // Reset to the first image
          Image: stories[(currentIndex + 1) % stories.length].images[0].img, // Set to the first image of the next story
          Author: stories[(currentIndex + 1) % stories.length].author,
        };
      }

      // If not at the last image, stay in the current story
      return {
        ...prevState,
        imageIndex: newImageIndex,
        Image: currentObject.images[newImageIndex].img,
        Author: currentObject.author,
      };
    });
  };

  const goToPreviousImage = () => {
    setCurrentStoryBeingShown((prevState) => {
      const { currentIndex, imageIndex } = prevState;
      const currentObject = stories[currentIndex];
      const newImageIndex = imageIndex - 1;

      // If we are at the first image of the current story, go to the previous story
      if (newImageIndex < 0) {
        const prevIndex = (currentIndex - 1 + stories.length) % stories.length; // Loop to the previous story
        const prevImageIndex = stories[prevIndex].images.length - 1; // Get the last image of the previous story
        return {
          ...prevState,
          currentIndex: prevIndex,
          imageIndex: prevImageIndex,
          Image: stories[prevIndex].images[prevImageIndex].img,
          Author: stories[prevIndex].author,
        };
      }

      // If not at the first image, stay in the current story
      return {
        ...prevState,
        imageIndex: newImageIndex,
        Image: currentObject.images[newImageIndex].img,
        Author: currentObject.author,
      };
    });
  };

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <StoryPageSidebar session={session} stories={stories} />
      </div>
      <div className="col-span-8 bg-black">
        <StoryPageContent
          session={session}
          stories={{
            Image: currentStoryBeingShown.Image,
            Author: currentStoryBeingShown.Author,
            imgLength: currentStoryBeingShown.imgLength,
            imgIndex: currentStoryBeingShown.imageIndex,
          }}
          goToNextImage={goToNextImage}
          goToPreviousImage={goToPreviousImage}
        />
      </div>
    </div>
  );
};

export default StoryPage;
