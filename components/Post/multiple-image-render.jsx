import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MultipleImageRender = ({ blog, dominantColorPost, isLoading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
                  filter: imageLoaded ? "blur(4px)" : "none",
                  zIndex: "-1",
                }}
              />
              <div className="relative w-full flex flex-col">
                <Image
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1200}
                  height={800}
                  priority={true}
                  src={blog.image[0].url}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-full transition max-h-[30rem]"
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
          {blog.image.length === 2 && (
            <div className="grid grid-cols-2 gap-x-1">
              {blog.image.map((imageUrl, index) => (
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
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "6/10" }}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Render 3 images */}
          {blog.image.length === 3 && (
            <div className="grid grid-cols-8 gap-x-1">
              <Link
                href={`/postComment/${blog.id}/${0}`}
                className="relative col-span-5 hover:opacity-80"
              >
                <Image
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1200}
                  height={800}
                  src={blog.image[0].url}
                  priority={true}
                  alt="profile image"
                  className="w-full h-auto object-cover my-1"
                  style={{ aspectRatio: "14/17" }}
                />
              </Link>
              <div className="mt-[2px] flex flex-col col-span-3">
                {blog.image.map((imageUrl, index) => {
                  if (index === 0) return null;
                  return (
                    <Link
                      href={`/postComment/${blog.id}/${index}`}
                      key={index}
                      className="relative mt-[4px] hover:opacity-80"
                    >
                      <Image
                        src={imageUrl.url}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        width={1200}
                        height={800}
                        alt="profile image"
                        className="w-full h-auto object-cover mt-[1px]"
                        style={{ aspectRatio: "13/13" }}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Render 4 images */}
          {blog.image.length === 4 && (
            <div className="flex flex-col">
              <div className="relative grid grid-cols-2 gap-x-[2px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="hover:opacity-80"
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1200}
                    height={800}
                    priority={true}
                    src={blog.image[0].url}
                    alt="profile image"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                  />
                </Link>
                <Link
                  href={`/postComment/${blog.id}/${1}`}
                  className="hover:opacity-80"
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
              <div className="mt-[2px] grid grid-cols-2">
                {blog.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return null;
                  }

                  if (index === 1) {
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
                        className="w-full h-auto object-cover px-[1px]"
                        style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* render if there are 5 image */}
          {blog.image.length === 5 && (
            <div className="flex flex-col">
              <div className="relative grid grid-cols-2 gap-x-[2px]">
                <Link
                  href={`/postComment/${blog.id}/${0}`}
                  className="relative hover:opacity-80"
                >
                  <Image
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1200}
                    height={800}
                    priority={true}
                    src={blog.image[0].url}
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
                    alt="profile image"
                    priority={true}
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
                        className="w-full h-auto object-cover px-[1px]"
                        style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                      />
                    </Link>
                  );
                })}
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
