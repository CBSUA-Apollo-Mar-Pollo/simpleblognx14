import UserAvatar from "@/components/UserAvatar";
import { UploadButton } from "@uploadthing/react";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const BackgroundImage = ({ imageUrl, setImageUrl, session, user }) => {
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaY = e.clientY - dragStartY;
      containerRef.current.scrollTop -= deltaY;
      setDragStartY(e.clientY);
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
            className="overflow-y-auto h-[60vh] rounded-b-3xl scroll-container bg-neutral-900"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setDragging(false)}
            ref={containerRef}
          >
            <div className="scroll-container">
              <Image
                sizes="100vw"
                width={0}
                height={0}
                src={imageUrl}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="w-[70vw] max-h-screen cursor-move"
                draggable="false"
                ref={imageRef}
                onMouseMove={getImagePosition} // Call when the mouse moves over the image
              />
            </div>
          </div>

          {session?.user.id === user.id && (
            <UploadButton
              className="absolute bottom-5 right-10 z-10 ut-button:bg-white ut-button:text-black ut-button:w-[14rem] ut-button:hover:bg-gray-100 ut-button:px-1"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
              content={{
                button({ ready, isUploading }) {
                  if (ready) {
                    return (
                      <div className="flex items-center gap-x-2">
                        <Camera className="text-white" fill="black" />
                        <span className="font-semibold text-sm">
                          Change cover photo
                        </span>
                      </div>
                    );
                  }

                  if (isUploading) {
                    return (
                      <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
                    );
                  }
                },
                allowedContent({ ready, fileTypes, isUploading }) {
                  return "";
                },
              }}
            />
          )}
          {/* profile pic */}
          <div className="absolute bottom-0 top-[22vw] left-[4vw]">
            <UserAvatar
              className="h-44 w-44 border-4 border-neutral-800"
              user={{
                name: user?.name || null,
                image: user?.image || null,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="w-[70vw] bg-neutral-900 h-[60vh] rounded-b-2xl relative">
          {session?.user.id === user.id && (
            <UploadButton
              className="absolute bottom-5 right-10 ut-button:bg-white ut-button:text-black ut-button:w-[11rem] ut-button:hover:bg-gray-100 ut-button:px-1"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
              content={{
                button({ ready, isUploading }) {
                  if (ready) {
                    return (
                      <div className="flex items-center gap-x-2">
                        <Camera className="text-white" fill="black" />
                        <span className="font-semibold text-sm">
                          Add cover photo
                        </span>
                      </div>
                    );
                  }

                  if (isUploading) {
                    return (
                      <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
                    );
                  }
                },
                allowedContent({ ready, fileTypes, isUploading }) {
                  return "";
                },
              }}
            />
          )}
          {/* profile pic */}
          <div className="absolute bottom-0 top-[22vw] left-[4vw]">
            <UserAvatar
              className="h-44 w-44 border-4 border-neutral-800"
              user={{
                name: user?.name || null,
                image: user?.image || null,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
