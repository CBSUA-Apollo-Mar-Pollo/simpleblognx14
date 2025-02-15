import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import UpdateCoverPhotoButton from "./UpdateCoverPhotoButton";
import ProfilePIc from "./profile-pic";
import { Loader2 } from "lucide-react";

const BackgroundImage = ({ imageUrl, setImageUrl, session, user }) => {
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [childPosition, setChildPosition] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => setImageLoading(false);

  return (
    <div className="relative">
      {/* div if user is not yet to upload background image */}
      {imageUrl.length ? (
        <div className="relative">
          <div
            className="overflow-y-auto h-[55vh] rounded-b-3xl scroll-container bg-neutral-900 cursor-move"
            ref={containerRef}
          >
            {imageLoading && (
              <div className="flex items-center justify-center gap-x-2 text-lg h-full">
                <Loader2 className="w-10 h-10  animate-spin text-white" />
              </div>
            )}
            {/* show the image that will be uploaded  */}
            <div className="scroll-container relative">
              <Image
                sizes="100vw"
                width={0}
                height={0}
                src={imageUrl[0].url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="w-[80vw] max-h-fit"
                draggable="false"
                ref={imageRef}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </div>

          {/* button for uploading cover photo */}
          <UpdateCoverPhotoButton
            setImageUrl={setImageUrl}
            user={user}
            session={session}
          />
        </div>
      ) : (
        <div>
          {/* if the user has uploaded a cover photo display it */}
          {user.backgroundImage ? (
            <div className="overflow-hidden h-[45vh] rounded-b-3xl scroll-container bg-neutral-900 z-20">
              <Link
                href={`/postComment/${user.coverPhotoId}/0`}
                className="scroll-container"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={user.backgroundImage}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="w-[80vw] max-h-fit"
                  // style={{ transform: "translateY()" }} // Adjust the percentage as needed
                />
              </Link>
            </div>
          ) : (
            // show a blank cover photo
            <div className=" rounded-b-3xl scroll-container bg-neutral-400 dark:bg-neutral-800 h-[55vh]">
              <div className="w-[80vw]" />
            </div>
          )}

          <UpdateCoverPhotoButton
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
