import React from "react";

const ImagePreviewCreatePost = ({ imagePreviews }) => {
  return (
    <div>
      {imagePreviews.length === 1 && (
        <div>
          {imagePreviews.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt="profile image"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "10/9" }} // Example aspect ratio (adjust as needed)
              />
            </div>
          ))}
        </div>
      )}

      {imagePreviews.length === 2 && (
        <div
          className={`${
            imagePreviews.length === 2 && "grid grid-cols-2 gap-x-1"
          }`}
        >
          {imagePreviews.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt="profile image"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "6  /10" }} // Example aspect ratio (adjust as needed)
              />
            </div>
          ))}
        </div>
      )}

      {imagePreviews.length === 3 && (
        <div
          className={`${
            imagePreviews.length === 3 && "grid grid-cols-8 gap-x-1"
          }`}
        >
          <div className="relative col-span-5 mt-1">
            <img
              src={imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "7/11" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] flex flex-col space-y-[4px] col-span-3">
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "9/12" }} // Example aspect ratio (adjust as needed)
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {imagePreviews.length === 4 && (
        <div className="flex flex-col">
          <div className="relative grid grid-cols-2">
            <img
              src={imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-2">
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
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

      {imagePreviews.length === 5 && (
        <div className="flex flex-col">
          <div className="relative grid grid-cols-2">
            <img
              src={imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-3">
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }

              return (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
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
              src={imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1]}
              alt="profile image"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[2px] grid grid-cols-3">
            {imagePreviews.map((imageUrl, index) => {
              if (index === 0) {
                return null;
              }

              if (index === 1) {
                return null;
              }

              if (index >= 5) {
                return null;
              }

              return (
                <div key={index} className="relative ">
                  <img
                    src={imageUrl}
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
    </div>
  );
};

export default ImagePreviewCreatePost;
