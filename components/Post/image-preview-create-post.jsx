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

  const verticalCount = previewMeta.filter(
    (img) => img.orientation === "vertical",
  ).length;

  const horizontalCount = previewMeta.length - verticalCount;

  const isSingleHorizontal =
    previewMeta.length === 1 && previewMeta[0].orientation === "horizontal";

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

  // dominant orientation
  const isFourVertical = verticalCount > horizontalCount;
  const isFourHorizontal = horizontalCount > verticalCount;

  const orderedPreviewMeta = (() => {
    // all same → keep original order
    if (verticalCount === 4 || horizontalCount === 4) {
      return previewMeta;
    }

    // 3 vertical, 1 horizontal → horizontal last
    if (verticalCount === 3) {
      return [
        ...previewMeta.filter((img) => img.orientation === "vertical"),
        ...previewMeta.filter((img) => img.orientation === "horizontal"),
      ];
    }

    // 3 horizontal, 1 vertical → vertical last
    if (horizontalCount === 3) {
      return [
        ...previewMeta.filter((img) => img.orientation === "horizontal"),
        ...previewMeta.filter((img) => img.orientation === "vertical"),
      ];
    }

    return previewMeta;
  })();

  const isFiveHorizontal =
    previewMeta.length === 5 &&
    previewMeta.every((img) => img.orientation === "horizontal");

  const isFiveVertical =
    previewMeta.length === 5 &&
    previewMeta.every((img) => img.orientation === "vertical");

  console.log(isFourHorizontal, "isFourHorizontal");

  return (
    <div>
      {imagePreviews.length === 1 && (
        <div>
          {imagePreviews.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt="profile image"
                className="w-full h-auto object-cover rounded-lg"
                style={{
                  aspectRatio: isSingleHorizontal ? "16 / 9" : "3 / 4 ",
                }}
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
                  <div
                    key={index}
                    className="relative w-full h-full rounded-md"
                  >
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

      {/* preview image for 4 */}
      {previewMeta.length === 4 &&
        (() => {
          const verticalCount = previewMeta.filter(
            (img) => img.orientation === "vertical",
          ).length;

          const horizontalCount = previewMeta.length - verticalCount;

          const isFourVertical = verticalCount > horizontalCount;
          const isFourHorizontal = horizontalCount > verticalCount;

          const orderedPreviewMeta = (() => {
            if (verticalCount === 4 || horizontalCount === 4) {
              return previewMeta;
            }

            if (verticalCount === 3) {
              return [
                ...previewMeta.filter((img) => img.orientation === "vertical"),
                ...previewMeta.filter(
                  (img) => img.orientation === "horizontal",
                ),
              ];
            }

            if (horizontalCount === 3) {
              return [
                ...previewMeta.filter(
                  (img) => img.orientation === "horizontal",
                ),
                ...previewMeta.filter((img) => img.orientation === "vertical"),
              ];
            }

            return previewMeta;
          })();

          return (
            <div
              className={`grid gap-1 ${
                isFourHorizontal ? "grid-rows-2" : "grid-cols-7"
              }`}
            >
              {/* HERO IMAGE */}
              <div
                className={`relative ${
                  isFourHorizontal ? "row-span-1" : "col-span-5"
                }`}
              >
                <img
                  src={orderedPreviewMeta[0].src}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                  style={{
                    aspectRatio: isFourVertical
                      ? "10 / 11"
                      : isFourHorizontal
                        ? "16 / 9"
                        : "1 / 1",
                  }}
                />
              </div>

              {/* STACKED GRID */}
              <div
                className={`grid gap-1 ${
                  isFourHorizontal
                    ? "grid-cols-3 h-10"
                    : "grid-cols-1 col-span-2"
                }`}
              >
                {orderedPreviewMeta.slice(1).map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.src}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                      style={{
                        aspectRatio: isFourHorizontal ? "1.2 / 1" : "10 / 10",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

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
          <div className="relative grid grid-cols-2 gap-1">
            <img
              src={imagePreviews[0]}
              alt="profile image"
              className="w-full h-auto object-cover rounded-md"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
            <img
              src={imagePreviews[1]}
              alt="profile image"
              className="w-full h-auto object-cover rounded-md"
              style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
            />
          </div>
          <div className="mt-[4px] grid grid-cols-3 gap-1 ">
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
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt="profile image"
                    className={`w-full h-auto object-cover rounded-md ${
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
