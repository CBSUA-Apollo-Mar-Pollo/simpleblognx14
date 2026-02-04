import React, { useEffect, useState } from "react";

const ImagePreviewCreatePost = ({ imagePreviews }) => {
  const [previewMeta, setPreviewMeta] = useState([]);
  const getImageOrientation = (base64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        if (img.height >= img.width) {
          resolve("vertical");
        } else {
          resolve("horizontal");
        }
      };
    });
  };

  useEffect(() => {
    if (!imagePreviews.length) return;

    const loadMeta = async () => {
      const results = await Promise.all(
        imagePreviews.map(async (src) => ({
          src,
          orientation: await getImageOrientation(src),
        })),
      );

      setPreviewMeta(results);
    };

    loadMeta();
  }, [imagePreviews]);

  const isBothVertical =
    previewMeta.length === 2 &&
    previewMeta.every((img) => img.orientation === "vertical");

  // const isBothHorizontal =
  //   previewMeta.length === 2 &&
  //   previewMeta.every((img) => img.orientation === "horizontal");

  // const isThreeVertical =
  //   previewMeta.length === 3 &&
  //   previewMeta.every((img) => img.orientation === "vertical");

  const heroOrientation = previewMeta[0]?.orientation;
  const secondaryOrientations = previewMeta
    .slice(1)
    .map((img) => img.orientation);

  const isThreeHorizontal =
    heroOrientation === "horizontal" &&
    secondaryOrientations.every((o) => o === "horizontal");

  const isFourVertical =
    previewMeta.length === 4 &&
    previewMeta.every((img) => img.orientation === "vertical");

  const isFiveHorizontal =
    previewMeta.length === 5 &&
    previewMeta.every((img) => img.orientation === "horizontal");

  const isFiveVertical =
    previewMeta.length === 5 &&
    previewMeta.every((img) => img.orientation === "vertical");

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

      {previewMeta.length === 2 && (
        <div
          className={`grid gap-1 ${
            isBothVertical ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {previewMeta.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.src}
                alt="preview"
                className="w-full object-cover rounded-md"
                style={{
                  aspectRatio: isBothVertical ? "6 / 10" : "3 / 1",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {previewMeta.length === 3 &&
        (() => {
          const verticalCount = previewMeta.filter(
            (img) => img.orientation === "vertical",
          ).length;
          const horizontalCount = previewMeta.length - verticalCount;

          const isThreeHorizontal = horizontalCount > verticalCount;

          return (
            <div
              className={`grid gap-1 ${isThreeHorizontal ? "grid-rows-2" : "grid-cols-8"}`}
            >
              {/* HERO IMAGE */}
              <div
                className={`relative block ${isThreeHorizontal ? "row-span-1" : "col-span-5"}`}
              >
                <div className="relative w-full ">
                  <img
                    src={previewMeta[0].src}
                    alt="preview"
                    className="object-cover rounded-md"
                    style={{
                      aspectRatio: isThreeHorizontal ? "6 / 3" : "3 / 5",
                    }}
                  />
                </div>
              </div>

              {/* SECONDARY IMAGES */}
              <div
                className={`${
                  isThreeHorizontal
                    ? "grid grid-cols-2 gap-1"
                    : "flex flex-col gap-1 col-span-3"
                }`}
              >
                {previewMeta.slice(1).map((img, index) => (
                  <div key={index} className="relative w-full rounded-md">
                    <div className="relative w-full">
                      <img
                        src={img.src}
                        alt="preview"
                        className="object-cover rounded-md"
                        style={{
                          aspectRatio: isThreeHorizontal
                            ? "16 / 9"
                            : "3 / 4.17",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      {previewMeta.length === 4 && (
        <div
          className={`grid gap-1 ${
            isFourHorizontal ? "grid-rows-2" : "grid-cols-2"
          }`}
        >
          {/* HERO IMAGE */}
          <div className={`relative ${isFourHorizontal ? "row-span-1" : ""}`}>
            <img
              src={previewMeta[0].src}
              alt="preview"
              className="w-full h-full object-cover rounded-md"
              style={{
                aspectRatio: isFourVertical
                  ? "7 / 11"
                  : isFourHorizontal
                    ? "16 / 9"
                    : "1 / 1",
              }}
            />
          </div>

          {/* STACKED GRID */}
          <div
            className={`grid gap-1 ${
              isFourHorizontal ? "grid-cols-3 h-10" : "grid-cols-2"
            }`}
          >
            {(isFourHorizontal
              ? previewMeta.slice(1)
              : previewMeta.slice(1)
            ).map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.src}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                  style={{
                    aspectRatio: isFourHorizontal ? "1 / 1" : "1 / 1",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {previewMeta.length === 5 && isFiveHorizontal && (
        <div className="grid grid-cols-2 gap-1">
          {/* LEFT COLUMN (2 images) */}
          <div className="flex flex-col gap-1">
            {previewMeta.slice(0, 2).map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                style={{ aspectRatio: "16 / 9" }}
              />
            ))}
          </div>

          {/* RIGHT COLUMN (3 images) */}
          <div className="flex flex-col gap-1">
            {previewMeta.slice(2).map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                style={{ aspectRatio: "16 / 9" }}
              />
            ))}
          </div>
        </div>
      )}

      {previewMeta.length === 5 && isFiveVertical && (
        <div className="grid grid-rows-2 gap-1">
          {/* TOP ROW (2 images) */}
          <div className="grid grid-cols-2 gap-1">
            {previewMeta.slice(0, 2).map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                style={{ aspectRatio: "1 / 1" }}
              />
            ))}
          </div>

          {/* BOTTOM ROW (3 images) */}
          <div className="grid grid-cols-3 gap-1">
            {previewMeta.slice(2).map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                style={{ aspectRatio: "5 / 1" }}
              />
            ))}
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
