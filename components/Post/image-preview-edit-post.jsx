import React from "react";

const ImagePreviewEditPost = ({ imagePreviews, blog }) => {
  console.log(imagePreviews, "image previews in edit post");
  return (
    <>
      {imagePreviews.length === 1 && (
        <div>
          <div className="relative">
            <img
              src={imagePreviews[0] && imagePreviews[0].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "10/9" }} // Example aspect ratio (adjust as needed)
            />
          </div>
        </div>
      )}

      {imagePreviews.length === 2 && (
        <div className="grid grid-cols-2 gap-x-1">
          {imagePreviews.map((imageData, index) => (
            <div key={index} className="relative">
              <img
                src={typeof imageData === "string" ? imageData : imageData.url}
                alt={
                  typeof imageData === "string"
                    ? "profile image"
                    : imageData.name
                }
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "6 / 10" }}
              />
            </div>
          ))}
        </div>
      )}

      {imagePreviews.length === 3 && (
        <div
          className={`${
            imagePreviews.length === 3 && "grid grid-cols-10 gap-x-1"
          }`}
        >
          <div className="relative col-span-6">
            <img
              src={imagePreviews[0].url}
              alt="profile image"
              className=" h-full object-fill"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className=" flex flex-col space-y-[4px] col-span-4">
            {imagePreviews.map((imageData, index) => {
              if (index === 0) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={
                      typeof imageData === "string" ? imageData : imageData.url
                    }
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "11/13" }} // Example aspect ratio (adjust as needed)
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {imagePreviews.length === 4 && (
        <div className="flex flex-col">
          <div className="relative grid grid-cols-2 gap-x-1">
            <img
              src={imagePreviews[0].url || imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1].url || imagePreviews[1]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-2 gap-x-1">
            <img
              src={imagePreviews[2].url || imagePreviews[2]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }
              if (index === 2) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={imageUrl || imageUrl.url}
                    alt={imageUrl.name}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {imagePreviews.length === 5 && (
        <div className="flex flex-col">
          <div className="relative grid grid-cols-2">
            <img
              src={imagePreviews[0] && imagePreviews[0].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1] && imagePreviews[1].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-3 gap-x-[3px]">
            <img
              src={imagePreviews[2] && imagePreviews[2].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }

              if (index === 2) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={(imageUrl && imageUrl.url) || imageUrl}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {imagePreviews.length >= 6 && (
        <div className="flex flex-col">
          <div className="relative grid grid-cols-2">
            <img
              src={imagePreviews[0] && imagePreviews[0].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1] && imagePreviews[1].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-3 gap-x-[2px]">
            <img
              src={imagePreviews[2] && imagePreviews[2].url}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            {imagePreviews?.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }

              if (index === 2) {
                return null;
              }

              if (index >= 5) {
                return null;
              }

              return (
                <div key={index} className="relative ">
                  <img
                    src={imageUrl.url}
                    alt="profile image"
                    className={`w-full h-auto object-cover ${
                      index === 4 && "opacity-55"
                    }`}
                    style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                  />
                  {index === 4 && (
                    <span className="absolute inset-0 flex items-center justify-center text-[3em]">
                      +{imagePreviews.length > 5 && imagePreviews.length - 5}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewEditPost;
