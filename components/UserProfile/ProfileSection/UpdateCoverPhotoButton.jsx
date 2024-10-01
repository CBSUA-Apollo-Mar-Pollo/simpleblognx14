import { UploadButton } from "@uploadthing/react";
import { Camera, Loader2 } from "lucide-react";
import React from "react";

const UpdateCoverPhotoButton = ({ setImageUrl, session, user }) => {
  return (
    <>
      {session?.user.id === user.id && (
        <UploadButton
          className="absolute bottom-1 right-10 ut-button:bg-white ut-button:text-black ut-button:w-[11rem] ut-button:hover:bg-gray-100 ut-button:px-1"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImageUrl(res);
          }}
          content={{
            button({ ready, isUploading }) {
              if (ready) {
                return isUploading ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <Loader2 className="w-5 h-5 text-zinc-800 animate-spin my-10" />
                    <span className="text-sm">loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <Camera className="text-white" fill="black" />
                    <span className="font-semibold text-sm">
                      {user.backgroundImage
                        ? "Edit cover photo"
                        : "Add cover photo"}
                    </span>
                  </div>
                );
              }

              if (isUploading) {
                <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />;
              }
            },
            allowedContent({ ready, fileTypes, isUploading }) {
              return "";
            },
          }}
        />
      )}
    </>
  );
};

export default UpdateCoverPhotoButton;
