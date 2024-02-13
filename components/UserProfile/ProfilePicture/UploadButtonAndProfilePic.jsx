import UserAvatar from "@/components/UserAvatar";
import { UploadButton } from "@uploadthing/react";
import { Camera, Loader2 } from "lucide-react";
import React from "react";

const UploadButtonAndProfilePic = ({ setImageUrl, user, session }) => {
  return (
    <>
      {session?.user.id === user.id && (
        <UploadButton
          className="absolute bottom-1 right-10 ut-button:bg-white ut-button:text-black ut-button:w-[11rem] ut-button:hover:bg-gray-100 ut-button:px-1"
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
                      {user.backgroundImage
                        ? "Edit cover photo"
                        : "Add cover photo"}
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
        <div className="relative">
          <UserAvatar
            className="h-44 w-44 border-4 border-neutral-50"
            user={{
              name: user?.name || null,
              image: user?.image || null,
            }}
          />
          {session?.user.id === user.id && (
            <UploadButton
              className="ut-button:bg-neutral-300 absolute bottom-1 ut-button:hover:bg-neutral-400 right-0 ut-button:rounded-full ut-button:w-10"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
              content={{
                button({ ready, isUploading }) {
                  if (ready) {
                    return (
                      <div className="flex items-center gap-x-2">
                        <Camera
                          className="text-neutral-200 h-8 w-8"
                          fill="black"
                        />
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
        </div>
      </div>
    </>
  );
};

export default UploadButtonAndProfilePic;
