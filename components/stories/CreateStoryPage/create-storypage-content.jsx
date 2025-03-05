"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { ALargeSmall, ArrowDown, Minus, Plus, Triangle, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import {
  Poppins,
  Caveat,
  Playfair_Display,
  Lexend,
  Teko,
  Playfair,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Optionally set a custom CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const caveat = Caveat({
  subsets: ["latin"], // Choose subsets you need
  display: "swap",
  variable: "--font-caveat",
  weight: ["700"], // Optional: Specify weights
});
const playfair = Playfair_Display({
  subsets: ["latin"], // Choose subsets you need
  display: "swap",
  variable: "--font-playfair",
  weight: ["700"], // Optional: Specify weights
});
const lexend = Lexend({
  subsets: ["latin"], // Choose subsets you need
  display: "swap",
  variable: "--font-lexend",
  weight: ["700"], // Optional: Specify weights
});
const teko = Teko({
  subsets: ["latin"], // Choose subsets you need
  display: "swap",
  variable: "--font-teko",
  weight: ["700"], // Optional: Specify weights
});

const CraeateStoryPageContent = ({
  session,
  toggleAddText,
  setToggleAddText,
  image,
  setImage,
  storyPreview,
  setStoryPreview,
  setCropImageLink,
}) => {
  const [text, setText] = useState("");
  const [scale, setScale] = useState(2.5);
  const [rotation, setRotation] = useState(0);
  const [resizeTextToggle, setResizeTextToggle] = useState(false);
  const [textFontSize, setTextFontSize] = useState(30);
  const [size, setSize] = useState({ x: 100, y: 60 });
  const [isDraggableDisabled, setIsDraggableDisabled] = useState(false);
  const [isMouseInsideTextEditor, setIsMouseInsideTextEditor] = useState(false);
  const [chosenColor, setChosenColor] = useState("black");
  const [fontStyle, setFontStyle] = useState("Headline");
  const [imageName, setImageName] = useState("cropped-image-with-text.png");

  const colors = [
    "#000000", // black
    "#14b8a6", // teal-600
    "#f59e0b", // amber-600
    "#0ea5e9", // sky-600
    "#fbbf24", // yellow-600
    "#4b5563", // gray-600
    "#84cc16", // lime-600
    "#8b5cf6", // purple-600
    "#f43f5e", // rose-600
    "#ef4444", // red-600
    "#ffffff", // white
    "#7c3aed", // violet-600
  ];

  const fontFamilies = {
    Headline: poppins,
    Casual: caveat,
    Fancy: playfair,
    Simple: lexend,
    Clean: teko,
  };

  const imageRef = useRef(null);
  const cropRef = useRef(null);
  const textRef = useRef(null); // Reference for draggable text
  const inputRef = useRef();
  const textBorderRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoryPreview(true);
      setImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  }, [toggleAddText]);

  const { data: dominantColor, error } = useQuery({
    queryKey: ["dominantColor", image],
    queryFn: async () => {
      const res = await getDominantColor(image);
      return res;
    },
  });

  // for cropping the image
  const handleCrop = () => {
    const cropRect = cropRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const imgRect = img.getBoundingClientRect();
    const textElement = textRef.current;
    const textBorderElement = textBorderRef.current;

    // Create a canvas to draw the cropped image and text
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the crop area size
    canvas.width = cropRect.width;
    canvas.height = cropRect.height;

    // Create a linear gradient for the background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(
      0,
      `rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 1)`
    ); // Starting color (dominant color)
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)"); // Ending color (white)

    // Apply the gradient as the background fill style
    ctx.fillStyle = gradient;

    // Fill the entire canvas with the gradient background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    // Calculate the text position relative to the crop area
    const textPosition = textElement?.getBoundingClientRect();

    const textOffsetX = textPosition?.left - cropRect.left;
    const textOffsetY = textPosition?.top - cropRect.top;

    // Apply the scale and rotation to the text position
    const transformedX = textOffsetX; // Apply scale transformation
    const transformedY = textOffsetY - 20; // Apply scale transformation

    // Apply rotation to the text
    ctx.save(); // Save the current canvas state
    ctx.translate(canvas.width / 2, canvas.height / 2); // Move the origin to the center of the canvas
    ctx.translate(-canvas.width / 2, -canvas.height / 2); // Move back to the original origin

    // Draw the draggable text onto the canvas
    if (textElement) {
      ctx.font = `bolder ${textFontSize + 1}px ${
        fontFamilies[fontStyle].style.fontFamily
      }`; // Customize font size and family
      ctx.fillStyle = chosenColor; // Set text color from state
      ctx.fillText(
        text,
        transformedX, // Draw text at the transformed position
        transformedY // Draw text at the transformed position
      );
    }

    ctx.restore(); // Restore the canvas state after rotation

    // Get cropped image with text as a data URL (use "image/png" for transparency support)
    const croppedImage = canvas.toDataURL("image/png");

    // Extract MIME type from the base64 string
    const [metadata, base64Data] = croppedImage.split(",");
    const mimeType = metadata.match(/:(.*?);/)[1]; // Extract the MIME type

    // Decode the base64 string
    const binaryString = atob(base64Data);
    const byteNumbers = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteNumbers[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the binary data
    const fileBlob = new Blob([byteNumbers], { type: mimeType });

    // Create a File object
    const file = new File([fileBlob], imageName, {
      type: mimeType,
      lastModified: Date.now(),
    });

    setCropImageLink(file);
  };

  const zoomIn = () => {
    setScale((prevScale) => {
      // Increment the scale value by 0.1 and round to one decimal place

      const nextScale = Math.round((parseFloat(prevScale) + 0.1) * 10) / 10;

      // Return the next scale, ensuring it does not exceed the max value of 2.5
      return nextScale <= 2.5 ? nextScale : prevScale;
    });
  };

  const zoomOut = () =>
    setScale((prevScale) =>
      parseFloat(prevScale) > 0.1
        ? parseFloat(prevScale) - 0.1
        : parseFloat(prevScale)
    );

  const handleSliderClick = (e) => {
    const slider = e.target;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // X-coordinate relative to the slider
    const sliderWidth = rect.width;

    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);

    // Calculate the new value and ensure it's a number
    const newValue = min + (clickX / sliderWidth) * (max - min);

    // Set scale as a number
    setScale(Number(newValue));
  };

  // const rotateClockwise = () => setRotation((prev) => prev + 90);

  const handleCloseTextEditor = () => {
    setToggleAddText(false);
  };

  const handleMouseEnterOnText = () => {
    setResizeTextToggle(true);
  };

  const handleMouseLeaveOnText = () => {
    setResizeTextToggle(false);
  };

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    setIsDraggableDisabled(true);

    const onMouseMove = (mouseMoveEvent) => {
      setIsDraggableDisabled(true);
      setSize((currentSize) => {
        // Calculate new size
        const newSize = {
          x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
          y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
        };

        // Determine if the size is increasing or decreasing
        const isGettingBigger =
          newSize.x > currentSize.x || newSize.y > currentSize.y;

        // Adjust font size accordingly
        setTextFontSize((prevFontSize) =>
          isGettingBigger ? prevFontSize + 0.3 : prevFontSize - 0.3
        );

        return newSize;
      });
    };

    const onMouseUp = () => {
      setIsDraggableDisabled(false);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handleChangeFontStyle = (value) => {
    setFontStyle(value);
  };

  const handleOnMouseLeaveCropArea = () => {
    handleCrop();
  };

  return (
    <div className="relative ">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2">
        <Menu contentClassName="-mr-32" />
        <NotificationMenu />
        <UserAccountNav user={session.user} />
      </div>

      {storyPreview && (
        <div className="flex items-center justify-center h-screen gap-x-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-start dark:text-white">
              Preview
            </h1>

            <div>
              <div className="relative w-[48vw] h-[77vh]  rounded-t-2xl flex items-center justify-center overflow-hidden border-2 border-neutral-300 dark:border-neutral-800">
                <div
                  className="w-full bg-neutral-200 dark:bg-neutral-800"
                  style={{
                    position: "relative",
                    padding: "20px", // Add padding to create spacing around the crop area
                    borderRadius: "16px", // Optional: make the outer container rounded
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    onMouseLeave={handleOnMouseLeaveCropArea}
                    className="rounded-xl"
                    style={{
                      position: "relative",
                      width: "360px", // Width of the crop area
                      height: "630px", // Height of the crop area
                      margin: "20px auto",
                      border: "2px dashed #ccc",
                      overflow: "hidden",
                      backgroundImage: `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.9) 0%, rgba(255, 255, 255, 1) 100%)`,
                    }}
                    ref={cropRef}
                  >
                    {/* Draggable image */}
                    {image && (
                      <div
                        style={{
                          transform: `scale(${scale}) rotate(${rotation}deg)`,
                          transformOrigin: "center",
                          position: "relative",
                        }}
                      >
                        <Draggable>
                          <img
                            ref={imageRef}
                            src={image}
                            draggable="false"
                            alt="To be cropped"
                            style={{
                              position: "absolute",
                              cursor: "grab",
                              top: "10px",
                              left: "100px",
                            }}
                          />
                        </Draggable>
                      </div>
                    )}

                    {text.length !== 0 && toggleAddText === false && (
                      <Draggable disabled={isDraggableDisabled}>
                        <div
                          onMouseEnter={handleMouseEnterOnText}
                          onMouseLeave={handleMouseLeaveOnText}
                          onDoubleClick={() => setToggleAddText(true)}
                          style={{
                            position: "absolute",
                            top: "120px", // Set initial position of the text
                            left: "120px", // Set initial position of the text
                            cursor: "grab",
                            color: "red", // Text color
                            fontSize: "20px", // Text size
                            fontWeight: "bolder",
                          }}
                        >
                          <div>
                            <div className="relative">
                              {/* Circles at the corners */}
                              {resizeTextToggle && (
                                <div
                                  onClick={() => {
                                    setText("");
                                    setSize({ x: 100, y: 60 });
                                    setTextFontSize(30);
                                  }}
                                  className="absolute -top-[10px] -left-[10px] bg-neutral-500 rounded-full p-[5px] cursor-pointer"
                                >
                                  <X className="w-[13px] h-[13px] text-white" />
                                </div>
                              )}

                              {resizeTextToggle && (
                                <div
                                  onMouseEnter={() => {
                                    setIsDraggableDisabled(true);
                                  }}
                                  onMouseLeave={() => {
                                    setIsDraggableDisabled(false);
                                  }}
                                  onMouseDown={handler}
                                  className="absolute -bottom-[2px] -right-[1.5px] w-1.5 h-1.5 rounded-full bg-white cursor-se-resize"
                                ></div>
                              )}

                              <div
                                style={{
                                  width: size.x,
                                  height: size.y,

                                  whiteSpace: "nowrap",
                                  color: chosenColor,
                                }}
                                className={`flex  items-center justify-center h-auto w-auto text-center 
                                  ${
                                    resizeTextToggle
                                      ? `border border-neutral-50`
                                      : `border-0`
                                  }
                                  ${fontFamilies[fontStyle].className}

                                `}
                              >
                                <p
                                  style={{ fontSize: `${textFontSize}px` }}
                                  className="flex flex-col"
                                >
                                  {text}
                                  <span ref={textRef}></span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Draggable>
                    )}

                    {toggleAddText && (
                      <div
                        className="h-full w-auto backdrop-opacity-5 "
                        style={{
                          backgroundColor: "rgba(50, 50, 50, 0.5)", // Semi-transparent white background
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "120px", // Set initial position of the text
                            left: "0px", // Set initial position of the text
                            cursor: "grab",

                            fontSize: "100px", // Text size
                            fontWeight: "bolder",
                          }}
                        >
                          <Input
                            style={{
                              color: chosenColor, // Text color
                            }}
                            ref={inputRef}
                            value={text}
                            className={`border-0 text-2xl bg-transparent placeholder:text-black text-center dark:bg-transparent ${fontFamilies[fontStyle].className}`}
                            placeholder="Start typing"
                            onChange={(e) => setText(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {toggleAddText && (
                  <div className="absolute top-40 right-2">
                    <div
                      onMouseEnter={() => setIsMouseInsideTextEditor(true)}
                      onMouseLeave={() => setIsMouseInsideTextEditor(false)}
                      className="bg-white h-auto w-56 rounded-md relative px-2 pt-3 pb-2 space-y-2"
                    >
                      <div>
                        <Select
                          defaultValue="Headline"
                          onValueChange={(value) =>
                            handleChangeFontStyle(value)
                          }
                        >
                          <SelectTrigger className="py-2 px-3 w-[12vw] border border-neutral-300 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-x-2">
                              <span>
                                <ALargeSmall />
                              </span>
                              <SelectValue placeholder="Headline" />
                            </div>

                            <Triangle className="rotate-180 h-3 w-3 fill-black" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Headline">Headline</SelectItem>
                              <SelectItem value="Casual">Casual</SelectItem>
                              <SelectItem value="Fancy">Fancy</SelectItem>
                              <SelectItem value="Simple">Simple</SelectItem>
                              <SelectItem value="Clean">Clean</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-7 gap-y-2 border border-neutral-300 rounded-md p-3">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: color }}
                            onClick={() => setChosenColor(color)}
                            className="h-5 w-5 rounded-full border-2 border-neutral-300 cursor-pointer"
                          />
                        ))}
                      </div>

                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-500"
                        onClick={handleCloseTextEditor}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* footer for rotating image and zoom in and out the image */}
              <div className="w-[48vw] min-h-[6vh] border-2 border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 rounded-b-2xl flex items-center justify-center gap-x-3 pb-4 pt-5">
                <div className="flex items-center justify-end gap-x-2 w-[20vw]">
                  <Minus
                    onClick={zoomOut}
                    className="dark:text-white cursor-pointer"
                  />
                  <div className="mb-2 w-full max-w-xs">
                    <input
                      type="range"
                      min="0.1"
                      max="2.5"
                      step="0.1"
                      draggable="false"
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

                {/* <Button
                  onClick={rotateClockwise}
                  className="flex gap-x-2 bg-neutral-200 hover:bg-neutral-100"
                >
                  <RotateCw className="h-5 w-5 text-black" />
                  <span className="text-black ">Rotate Image</span>
                </Button> */}

                {/* <button onClick={handleCrop} style={{ marginTop: "10px" }}>
                  Crop Image
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {!storyPreview && (
        <div className="flex items-center justify-center h-screen gap-x-4">
          <Card className="border-0 dark:bg-neutral-800">
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

          <Card className="border-0 dark:bg-neutral-800">
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
