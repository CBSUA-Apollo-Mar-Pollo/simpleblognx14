import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import UploadButtonAndProfilePic from "./UploadButtonAndProfilePic";

const BackgroundImage = ({ imageUrl, setImageUrl, session, user }) => {
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [childPosition, setChildPosition] = useState(null);

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaY = e.clientY - dragStartY;
      containerRef.current.scrollTop -= deltaY;
      setDragStartY(e.clientY);
      console.log(containerRef.current.scrollTop, "scrollTop");
      console.log(imageRef.current.getBoundingClientRect(), "height ");
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const getImagePosition = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      //   console.log("Image position:", imageRect);
    }
  };

  return (
    <div className="relative flex justify-center">
      {/* div if user is not yet to upload background image */}
      {imageUrl.length ? (
        <div className="relative">
          <div
            className="overflow-y-auto h-[60vh] rounded-b-3xl scroll-container bg-neutral-900 cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setDragging(false)}
            ref={containerRef}
          >
            {/* show the image that will be uploaded  */}
            <div className="scroll-container">
              <Image
                sizes="100vw"
                width={0}
                height={0}
                src={imageUrl}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="w-[80vw] max-h-fit"
                draggable="false"
                ref={imageRef}
              />
            </div>
          </div>

          <UploadButtonAndProfilePic
            setImageUrl={setImageUrl}
            user={user}
            session={session}
          />
        </div>
      ) : (
        <div className="relative">
          {/* if the uploaded a cover photo */}
          {user.backgroundImage ? (
            <div className="overflow-y-clip h-[60vh] rounded-b-3xl scroll-container bg-neutral-900 relative">
              <Link
                href={`/postComment/${user.coverPhotoId}`}
                className="scroll-container relative"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={user.backgroundImage}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="w-[80vw] max-h-fit"
                />
              </Link>
            </div>
          ) : (
            // show a blank cover photo
            <div className="overflow-y-auto h-[60vh] rounded-b-3xl scroll-container bg-neutral-900">
              <div className="scroll-container">
                <div className="w-[70vw] max-h-screen cursor-move" />
              </div>
            </div>
          )}

          <UploadButtonAndProfilePic
            setImageUrl={setImageUrl}
            user={user}
            session={session}
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
