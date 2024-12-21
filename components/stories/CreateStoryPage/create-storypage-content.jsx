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

const CraeateStoryPageContent = ({ session }) => {
  const [storyPreview, setStoryPreview] = useState(null);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setStoryPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Function to handle mouse down
  const handleMouseDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Function to handle mouse move
  const handleMouseMove = (e) => {
    if (dragging.current) {
      const container = containerRef.current.getBoundingClientRect();
      const imageWidth = 480; // Replace with actual image width
      const imageHeight = 480; // Replace with actual image height

      // Calculate new positions
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Constrain movement to container bounds
      const clampedX = Math.max(
        0,
        Math.min(container.width - imageWidth, newX)
      );
      const clampedY = Math.max(
        0,
        Math.min(container.height - imageHeight, newY)
      );

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  // Function to handle mouse up
  const handleMouseUp = () => {
    dragging.current = false;
  };

  // Add/remove event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
              <div
                ref={containerRef}
                className="relative w-[48vw] h-[77vh]  rounded-t-2xl flex items-center justify-center overflow-hidden"
              >
                {/* This div represents the hole */}

                <div
                  className="absolute inset-0 z-50 grid grid-cols-12 "
                  onMouseDown={handleMouseDown}
                >
                  <div className="col-span-3 bg-neutral-950 opacity-95"></div>
                  <div className="col-span-6 flex flex-col ">
                    <div className="basis-[40px] bg-neutral-950 opacity-95 z-40 border-b"></div>
                    <div className="basis-full z-40 border-x"></div>
                    <div className="basis-[20px] bg-neutral-950 opacity-95 z-40 border-t"></div>
                  </div>
                  <div className="col-span-3 bg-neutral-950 opacity-95"></div>
                </div>

                {/* Semi-transparent overlay to simulate "paper" effect */}

                {/* Draggable image */}
                <div
                  className="absolute cursor-pointer"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    zIndex: 20,
                  }}
                  onMouseDown={handleMouseDown}
                >
                  <Image
                    width={480}
                    height={480}
                    src={storyPreview}
                    alt="Draggable image"
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
              </div>

              <div className="w-[48vw] h-[6vh] bg-neutral-900 rounded-b-2xl flex items-center justify-center gap-x-3 pb-3">
                <div className="flex items-center justify-end gap-x-2 w-[20vw]">
                  <Minus
                    onClick={zoomOut}
                    className="text-white cursor-pointer"
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
                    className="text-white cursor-pointer"
                  />
                </div>

                <Button
                  onClick={rotateClockwise}
                  className="flex gap-x-2 bg-neutral-200 hover:bg-neutral-100"
                >
                  <RotateCw className="h-5 w-5 text-black" />
                  <span className="text-black ">Rotate Image</span>
                </Button>
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
