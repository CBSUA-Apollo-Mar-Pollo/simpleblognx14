"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MultipleImageRender = ({ blog, dominantColorPost, isLoading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [meta, setMeta] = useState([]);

  const getOrientation = (url) =>
    new Promise((resolve) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () =>
        resolve(img.width >= img.height ? "horizontal" : "vertical");
    });

  useEffect(() => {
    if (!blog.image?.length) return;

    Promise.all(
      blog.image.map(async (img) => ({
        url: img.url,
        orientation: await getOrientation(img.url),
      })),
    ).then(setMeta);
  }, [blog.image]);

  const isBothVertical =
    meta.length === 2 && meta.every((img) => img.orientation === "vertical");
  const isThreeHorizontal =
    meta.length === 3 && meta.every((img) => img.orientation === "horizontal");
  const isFiveHorizontal =
    meta.length === 5 && meta.every((img) => img.orientation === "horizontal");

  const isFiveVertical =
    meta.length === 5 && meta.every((img) => img.orientation === "vertical");

  console.log(meta);

  return (
    <>
      {/* render if the user updated their cover photo */}
      {blog.image && (
        <div className="w-full ">
          {blog.userStatus === "updated his cover photo" && (
            <Link
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
            >
              <Image
                sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
                width={1200} // Example width, adjust based on design
                height={800} // Example height, adjust based on design
                priority={true}
                src={blog.image.url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-full transition max-h-[30rem] bg-neutral-700"
              />
            </Link>
          )}
          {blog.userStatus === "updated his profile picture" && (
            <Link
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
            >
              <Image
                sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
                width={1200} // Example width, adjust based on design
                height={800} // Example height, adjust based on design
                priority={true}
                src={blog.image.url}
                alt="profile image"
                referrerPolicy="no-referrer"
                className="object-contain w-full transition max-h-[30rem] bg-neutral-700"
              />
            </Link>
          )}

          {/* Render single image */}
          {blog.image.length === 1 && (
            <Link
              href={`/postComment/${blog.id}/${0}`}
              className="relative overflow-clip w-full flex flex-col"
              shallow
            >
              <div
                className="absolute inset-0 z-[-1] bg-center"
                style={{
                  backgroundColor: "black",
                  backgroundImage: imageLoaded
                    ? `url(${blog.image[0].url})`
                    : "none",
                  filter: imageLoaded ? "blur(60px)" : "none",
                  zIndex: "-1",
                }}
              />
              <div className="relative w-full flex flex-col">
                <Image
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1200}
                  height={900}
                  priority={true}
                  src={blog.image[0].url}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-full transition max-h-[45rem]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.1) 0%, rgba(${dominantColorPost?.[0]}, ${dominantColorPost?.[1]}, ${dominantColorPost?.[2]}, 0.2) 100%)`,
                    backgroundBlendMode: "overlay",
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </Link>
          )}

          {/* Render 2 images */}
          {meta.length === 2 && (
            <div
              className={`grid gap-[1px] ${
                isBothVertical ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {meta.map((img, index) => (
                <Link
                  href={`/postComment/${blog.id}/${index}`}
                  key={index}
                  className="relative block hover:opacity-80"
                >
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: isBothVertical ? "6 / 10" : "3 / 1",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt="preview"
                      fill
                      sizes={
                        isBothVertical
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "100vw"
                      }
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Render 3 images */}
          {meta.length === 3 &&
            (() => {
              const verticalCount = meta.filter(
                (img) => img.orientation === "vertical",
              ).length;
              const horizontalCount = meta.length - verticalCount;

              const isThreeHorizontal = horizontalCount > verticalCount;

              return (
                <div
                  className={`grid gap-[2px] ${isThreeHorizontal ? "grid-rows-2" : "grid-cols-8"}`}
                >
                  {/* HERO IMAGE */}
                  <Link
                    href={`/postComment/${blog.id}/${0}`}
                    className={`relative block hover:opacity-80 ${
                      isThreeHorizontal ? "row-span-1" : "col-span-5"
                    }`}
                  >
                    <div
                      className={`relative  ${isThreeHorizontal ? "h-[25vh] w-full" : ""}`}
                      style={{
                        aspectRatio: isThreeHorizontal ? "4/ 11" : "3 / 5",
                      }}
                    >
                      <Image
                        src={meta[0].url}
                        alt="preview"
                        fill
                        priority
                        sizes={
                          isThreeHorizontal
                            ? "(max-width:768px) 100vw, 100vw"
                            : "(max-width:768px) 100vw, 60vw"
                        }
                        className={`object-cover w-full `}
                      />
                    </div>
                  </Link>

                  {/* SECONDARY IMAGES */}
                  <div
                    className={`${
                      isThreeHorizontal
                        ? "grid grid-cols-2 gap-[2px]"
                        : "flex flex-col gap-[2px] col-span-3"
                    }`}
                  >
                    {meta.slice(1).map((img, index) => (
                      <Link
                        href={`/postComment/${blog.id}/${index + 1}`}
                        key={index}
                        className="relative block hover:opacity-80"
                      >
                        <div className="relative">
                          <img
                            src={img.url}
                            alt="preview"
                            className="object-cover"
                            style={{
                              aspectRatio: isThreeHorizontal
                                ? "16/10"
                                : "3 / 4.17",
                            }}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

          {/* Render 4 images */}
          {meta.length === 4 &&
            (() => {
              const verticalCount = meta.filter(
                (img) => img.orientation === "vertical",
              ).length;

              const horizontalCount = meta.length - verticalCount;

              const isFourVertical = verticalCount > horizontalCount;
              const isFourHorizontal = horizontalCount > verticalCount;

              const orderedPreviewMeta = (() => {
                if (verticalCount === 4 || horizontalCount === 4) {
                  return meta;
                }

                if (verticalCount === 3) {
                  return [
                    ...meta.filter((img) => img.orientation === "vertical"),
                    ...meta.filter((img) => img.orientation === "horizontal"),
                  ];
                }

                if (horizontalCount === 3) {
                  return [
                    ...meta.filter((img) => img.orientation === "horizontal"),
                    ...meta.filter((img) => img.orientation === "vertical"),
                  ];
                }

                return meta;
              })();

              return (
                <div
                  className={`grid gap-[2.5px] ${
                    isFourHorizontal ? "grid-rows-2" : "grid-cols-7"
                  }`}
                >
                  {/* HERO IMAGE */}

                  <Link
                    href={`/postComment/${blog.id}/${0}`}
                    className={`relative ${
                      isFourHorizontal ? "row-span-1" : "col-span-5"
                    } ${isFourHorizontal ? "h-[22vh]" : ""}`}
                  >
                    <Image
                      src={orderedPreviewMeta[0].url}
                      alt="preview"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      style={{
                        aspectRatio: isFourVertical
                          ? "10 / 11"
                          : isFourHorizontal
                            ? "4/11"
                            : "1 / 1",
                      }}
                    />
                  </Link>

                  {/* STACKED GRID */}
                  <div
                    className={`grid gap-[2px] ${
                      isFourHorizontal
                        ? "grid-cols-3 h-10"
                        : "grid-cols-1 col-span-2"
                    }`}
                  >
                    {orderedPreviewMeta.slice(1).map((img, index) => (
                      <Link
                        href={`/postComment/${blog.id}/${index + 1}`}
                        key={index}
                        className="relative hover:opacity-80"
                      >
                        <Image
                          src={img.url}
                          alt="preview"
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover"
                          style={{
                            aspectRatio: isFourHorizontal
                              ? "1.2 / 1"
                              : "10 / 10",
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

          {/* render if there are 5 image */}

          {meta.length === 5 && isFiveHorizontal && (
            <div className="grid grid-cols-[1fr_1fr] gap-1">
              <div className="grid grid-rows-2 gap-1">
                {meta.slice(0, 2).map((img, index) => (
                  <Link key={index} href={`/postComment/${blog.id}/${index}`}>
                    <img
                      src={img.url}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>
                ))}
              </div>

              <div className="grid grid-rows-3 gap-1">
                {meta.slice(2).map((img, index) => (
                  <Link
                    key={index}
                    href={`/postComment/${blog.id}/${index + 2}`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {meta.length === 5 && isFiveVertical && (
            <div className="grid grid-rows-2 gap-1">
              {/* TOP ROW (2 images) */}
              <div className="grid grid-cols-2 gap-1">
                {meta.slice(0, 2).map((img, index) => (
                  <Link
                    href={`/postComment/${blog.id}/${index}`}
                    key={index}
                    className="relative hover:opacity-80"
                  >
                    <img
                      key={index}
                      src={img.url}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  </Link>
                ))}
              </div>

              {/* BOTTOM ROW (3 images) */}
              <div className="grid grid-cols-3 gap-1">
                {meta.slice(2).map((img, index) => (
                  <Link
                    href={`/postComment/${blog.id}/${index + 2}`}
                    key={index}
                    className="relative hover:opacity-80"
                  >
                    <img
                      key={index}
                      src={img.url}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                      style={{ aspectRatio: "5 / 1" }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* render if there are 6 or more image */}
          {blog.image.length >= 6 && (
            <div className=" flex flex-col">
              <div className="relative grid grid-cols-2 gap-x-[1px] px-[1px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1200}
                    height={800}
                    src={blog.image[0].url}
                    priority={true}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <Link
                  href={`/postComment/${blog.id}/${1}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1200}
                    height={800}
                    src={blog.image[1].url}
                    priority={true}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
              </div>
              <div className="mt-[2px] grid grid-cols-3">
                {blog.image.map((imageUrl, index) => {
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
                    <Link
                      href={`/postComment/${blog.id}/${index}`}
                      key={index}
                      className="relative hover:opacity-80"
                    >
                      <Image
                        sizes="(max-width: 768px) 100vw, 50vw"
                        width={1200}
                        height={800}
                        src={imageUrl.url}
                        alt="profile image"
                        className={`w-full h-auto object-cover px-[1px] ${
                          index === 4 && "opacity-50"
                        }`}
                        style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                      />
                      {index === 4 && (
                        <span className="absolute inset-0 flex items-center justify-center text-[3em] text-neutral-800 dark:text-neutral-50">
                          +{blog.image.length > 5 && blog.image.length - 5}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MultipleImageRender;
