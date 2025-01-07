"use client";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import {
  ALargeSmall,
  Minus,
  Plus,
  Rotate3d,
  Rotate3D,
  RotateCw,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const CraeateStoryPageContent = ({ session }) => {
  const [storyPreview, setStoryPreview] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const cropRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoryPreview(true);
      setImage(URL.createObjectURL(file));
    }
  };

  //  for cropping the image
  const handleCrop = () => {
    const cropRect = cropRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const imgRect = img.getBoundingClientRect();

    // Create a canvas to draw the cropped image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the crop area size
    canvas.width = cropRect.width;
    canvas.height = cropRect.height;

    // Calculate the position and dimensions of the image to be cropped
    const scaleX = img.naturalWidth / imgRect.width; // Image scaling in x direction
    const scaleY = img.naturalHeight / imgRect.height; // Image scaling in y direction

    // Calculate the cropping coordinates (relative to the crop area)
    const offsetX = (cropRect.left - imgRect.left) * scaleX;
    const offsetY = (cropRect.top - imgRect.top) * scaleY;

    // Draw the portion of the image within the crop area to the canvas
    ctx.drawImage(
      img,
      offsetX, // Starting x coordinate of the image to be cropped
      offsetY, // Starting y coordinate of the image to be cropped
      cropRect.width * scaleX, // Width of the portion of the image to be cropped
      cropRect.height * scaleY, // Height of the portion of the image to be cropped
      0, // X coordinate on the canvas
      0, // Y coordinate on the canvas
      canvas.width, // Width on the canvas (match crop area size)
      canvas.height // Height on the canvas (match crop area size)
    );

    // Get cropped image as a data URL
    const croppedImage = canvas.toDataURL("image/jpeg");

    // Create a download link for the cropped image
    const downloadLink = document.createElement("a");
    downloadLink.href = croppedImage;
    downloadLink.download = "cropped-image.jpg";
    downloadLink.click();
  };

  const zoomIn = () => setScale((prevScale) => prevScale + 0.1);
  const zoomOut = () =>
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));

  const handleSliderClick = (e) => {
    const slider = e.target;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // X-coordinate relative to the slider
    const sliderWidth = rect.width;

    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const newValue = min + (clickX / sliderWidth) * (max - min);

    setScale(newValue.toFixed(2)); // Set value with precision
  };

  const rotateClockwise = () => setRotation((prev) => prev + 90);

  return (
    <div className="relative">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2">
        <Menu contentClassName="-mr-32" />
        <NotificationMenu />
        <UserAccountNav user={session.user} />
      </div>

      {storyPreview ? (
        <div className="flex items-center justify-center h-screen gap-x-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-start">Preview</h1>

            <div>
              <div className="relative w-[48vw] h-[77vh]  rounded-t-2xl flex items-center justify-center overflow-hidden border-2 border-neutral-300">
                {/* Draggable image */}
                <div
                  className="w-full bg-neutral-200"
                  style={{
                    position: "relative",
                    // Background color outside the crop area
                    padding: "20px", // Add padding to create spacing around the crop area
                    borderRadius: "16px", // Optional: make the outer container rounded
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="rounded-xl bg-white"
                    style={{
                      position: "relative",
                      width: "360px", // Width of the crop area
                      height: "630px", // Height of the crop area
                      margin: "20px auto",
                      border: "2px dashed #ccc",
                      overflow: "hidden",
                      // Ensures the image is clipped to this area
                    }}
                    ref={cropRef}
                  >
                    {image && (
                      <div
                        style={{
                          transform: `scale(${scale}) rotate(${rotation}deg)`,
                          transformOrigin: "center",
                        }}
                      >
                        <Draggable>
                          <img
                            ref={imageRef}
                            src={image}
                            alt="To be cropped"
                            style={{
                              position: "absolute",
                              cursor: "grab",
                            }}
                          />
                        </Draggable>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* footer for rotating image and zoom in and out the image */}
              <div className="w-[48vw] min-h-[6vh] border-2 border-neutral-300 dark:bg-neutral-900 rounded-b-2xl flex items-center justify-center gap-x-3 pb-4 pt-5">
                <div className="flex items-center justify-end gap-x-2 w-[20vw]">
                  <Minus
                    onClick={zoomOut}
                    className="dark:text-white cursor-pointer"
                  />
                  <div className="mb-2 w-full max-w-xs">
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      className="w-full h-1 rounded-none border-0 cursor-pointer  transition-all duration-300 ease-in-out"
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      onMouseDown={handleSliderClick} // Handle clicks
                    />
                  </div>
                  <Plus
                    onClick={zoomIn}
                    className="dark:text-white cursor-pointer"
                  />
                </div>

                <Button
                  onClick={rotateClockwise}
                  className="flex gap-x-2 bg-neutral-200 hover:bg-neutral-100"
                >
                  <RotateCw className="h-5 w-5 text-black" />
                  <span className="text-black ">Rotate Image</span>
                </Button>

                <button onClick={handleCrop} style={{ marginTop: "10px" }}>
                  Crop Image
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen gap-x-4">
          <Card className="border-0">
            <CardContent className=" flex items-center justify-center h-[50vh] min-w-[15vw] bg-gradient-to-tl from-purple-300 to-blue-600 rounded-2xl hover:opacity-85 hover:cursor-pointer">
              <div
                onClick={() => document.getElementById("fileInput").click()}
                className="flex flex-col items-center space-y-3"
              >
                <img
                  src="/ImageIcons/gallery.png"
                  className="h-12 w-12 bg-white p-2 rounded-full  drop-shadow-[0px_0px_7px_rgba(0,0,0,0.5)]"
                />
                <span className="text-white font-semibold ">
                  Create a photo story
                </span>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0">
            <CardContent className=" flex items-center justify-center h-[50vh] min-w-[15vw] bg-gradient-to-br from-rose-300 to-pink-500 rounded-2xl hover:opacity-85 hover:cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <ALargeSmall className="h-12 w-12 bg-white text-neutral-600 p-2 rounded-full  drop-shadow-[0px_0px_7px_rgba(0,0,0,0.5)]" />
                <span className="text-white font-semibold ">
                  Create a text story
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CraeateStoryPageContent;
