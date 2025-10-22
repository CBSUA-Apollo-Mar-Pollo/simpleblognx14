"use client";

import { getDominantColor } from "@/data/getDominantColor";
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
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["700"],
});
const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
  weight: ["700"],
});
const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-teko",
  weight: ["700"],
});

// Small reusable pointer-drag hook that works with mouse & touch via pointer events
function usePointerDrag({ initial = { x: 0, y: 0 }, enabled = true } = {}) {
  const posRef = useRef({ x: initial.x, y: initial.y });
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const draggingRef = useRef(false);
  const pointerIdRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    if (!enabled) return;
    // use native pointer events to support touch and mouse
    draggingRef.current = true;
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(pointerIdRef.current);
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    const next = { x: posRef.current.x + dx, y: posRef.current.y + dy };
    posRef.current = next;
    setPos(next);
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(pointerIdRef.current);
    } catch (err) {}
  };

  return { pos, onPointerDown, onPointerMove, onPointerUp, setPos, posRef };
}

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

  // New states to manage positions (replaces react-draggable)
  const [imagePos, setImagePos] = useState({ x: 100, y: 10 });
  const [textPos, setTextPos] = useState({ x: 120, y: 120 });

  const colors = [
    "#000000",
    "#14b8a6",
    "#f59e0b",
    "#0ea5e9",
    "#fbbf24",
    "#4b5563",
    "#84cc16",
    "#8b5cf6",
    "#f43f5e",
    "#ef4444",
    "#ffffff",
    "#7c3aed",
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
  const textRef = useRef(null);
  const inputRef = useRef();
  const textBorderRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) input.focus();
  }, [toggleAddText]);

  const { data: dominantColor } = useQuery({
    queryKey: ["dominantColor", image],
    queryFn: async () => {
      const res = await getDominantColor(image);
      return res;
    },
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoryPreview(true);
      setImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  // pointer-drag hooks for image and text
  const imageDrag = usePointerDrag({
    initial: imagePos,
    enabled: !isDraggableDisabled,
  });
  const textDrag = usePointerDrag({
    initial: textPos,
    enabled: !isDraggableDisabled,
  });

  // keep local states in sync when hook pos updates
  useEffect(() => {
    setImagePos(imageDrag.pos);
  }, [imageDrag.pos.x, imageDrag.pos.y]);

  useEffect(() => {
    setTextPos(textDrag.pos);
  }, [textDrag.pos.x, textDrag.pos.y]);

  // resizing handler (same idea as before)
  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    setIsDraggableDisabled(true);

    const onMouseMove = (mouseMoveEvent) => {
      setIsDraggableDisabled(true);
      setSize((currentSize) => {
        const newSize = {
          x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
          y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
        };

        const isGettingBigger =
          newSize.x > currentSize.x || newSize.y > currentSize.y;

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

  // Crop function unchanged aside from relying on DOM positions of elements
  const handleCrop = () => {
    const cropRect = cropRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const imgRect = img.getBoundingClientRect();
    const textElement = textRef.current;
    const textBorderElement = textBorderRef.current;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = cropRect.width;
    canvas.height = cropRect.height;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(
      0,
      `rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 1)`
    );
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;

    const offsetX = (cropRect.left - imgRect.left) * scaleX;
    const offsetY = (cropRect.top - imgRect.top) * scaleY;

    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      cropRect.width * scaleX,
      cropRect.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const textPosition = textElement?.getBoundingClientRect();
    const textOffsetX = textPosition?.left - cropRect.left;
    const textOffsetY = textPosition?.top - cropRect.top;

    const transformedX = textOffsetX;
    const transformedY = textOffsetY - 20;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    if (textElement) {
      ctx.font = `bolder ${textFontSize + 1}px ${
        fontFamilies[fontStyle].style.fontFamily
      }`;
      ctx.fillStyle = chosenColor;
      ctx.fillText(text, transformedX, transformedY);
    }

    ctx.restore();

    const croppedImage = canvas.toDataURL("image/png");

    const [metadata, base64Data] = croppedImage.split(",");
    const mimeType = metadata.match(/:(.*?);/)[1];

    const binaryString = atob(base64Data);
    const byteNumbers = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteNumbers[i] = binaryString.charCodeAt(i);
    }

    const fileBlob = new Blob([byteNumbers], { type: mimeType });

    const file = new File([fileBlob], imageName, {
      type: mimeType,
      lastModified: Date.now(),
    });

    setCropImageLink(file);
  };

  const zoomIn = () => {
    setScale((prevScale) => {
      const nextScale = Math.round((parseFloat(prevScale) + 0.1) * 10) / 10;
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
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width;

    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);

    const newValue = min + (clickX / sliderWidth) * (max - min);

    setScale(Number(newValue));
  };

  const handleCloseTextEditor = () => {
    setToggleAddText(false);
  };

  const handleMouseEnterOnText = () => {
    setResizeTextToggle(true);
  };

  const handleMouseLeaveOnText = () => {
    setResizeTextToggle(false);
  };

  return (
    <div className="relative ">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2">
        <Menu contentClassName="-mr-32" />
        <NotificationMenu />
        <UserAccountNav user={session?.user} />
      </div>

      {storyPreview && (
        <div className="flex items-center justify-center h-screen gap-x-4">
          <div className="">
            <h1 className="text-2xl font-bold text-start dark:text-white">
              Preview
            </h1>

            <div>
              <div className="relative w-[55vw] h-[77vh]  rounded-t-2xl flex items-center justify-center overflow-hidden border-2 border-neutral-300 dark:border-neutral-800">
                <div
                  className="w-full bg-neutral-800 "
                  style={{
                    position: "relative",
                    padding: "20px",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    onMouseLeave={handleOnMouseLeaveCropArea}
                    className="rounded-xl border-2 border-white"
                    style={{
                      position: "relative",
                      width: "360px",
                      height: "600px",
                      margin: "20px auto",

                      overflow: "hidden",
                      backgroundImage: `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.9) 0%, rgba(255, 255, 255, 1) 100%)`,
                    }}
                    ref={cropRef}
                  >
                    {image && (
                      <div
                        style={{
                          transform: `scale(${scale}) rotate(${rotation}deg)`,
                          transformOrigin: "center",
                          position: "relative",
                        }}
                      >
                        {/* custom draggable image */}
                        <div
                          onPointerDown={(e) => imageDrag.onPointerDown(e)}
                          onPointerMove={(e) => imageDrag.onPointerMove(e)}
                          onPointerUp={(e) => imageDrag.onPointerUp(e)}
                          style={{
                            position: "absolute",
                            top: imagePos.y,
                            left: imagePos.x,
                            cursor: isDraggableDisabled ? "default" : "grab",
                          }}
                        >
                          <img
                            ref={imageRef}
                            src={image}
                            draggable="false"
                            alt="To be cropped"
                            style={{ maxWidth: "300px", maxHeight: "600px" }}
                          />
                        </div>
                      </div>
                    )}

                    {text.length !== 0 && toggleAddText === false && (
                      <div
                        onPointerDown={(e) => textDrag.onPointerDown(e)}
                        onPointerMove={(e) => textDrag.onPointerMove(e)}
                        onPointerUp={(e) => textDrag.onPointerUp(e)}
                        style={{
                          position: "absolute",
                          top: textPos.y,
                          left: textPos.x,
                          cursor: isDraggableDisabled ? "default" : "grab",
                          color: "red",
                          fontSize: "20px",
                          fontWeight: "bolder",
                        }}
                      >
                        <div
                          onMouseEnter={handleMouseEnterOnText}
                          onMouseLeave={handleMouseLeaveOnText}
                          onDoubleClick={() => setToggleAddText(true)}
                        >
                          <div className="relative">
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
                              className={`flex  items-center justify-center h-auto w-auto text-center ${
                                resizeTextToggle
                                  ? `border border-neutral-50`
                                  : `border-0`
                              } ${fontFamilies[fontStyle].className}`}
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
                    )}

                    {toggleAddText && (
                      <div
                        className="h-full w-auto backdrop-opacity-5 "
                        style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "120px",
                            left: "0px",
                            cursor: "grab",
                            fontSize: "100px",
                            fontWeight: "bolder",
                          }}
                        >
                          <Input
                            style={{ color: chosenColor }}
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

              <div className="w-[55vw] min-h-[6vh] border-2 border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 rounded-b-2xl flex items-center justify-center gap-x-3 pb-4 pt-5">
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
                      onMouseDown={handleSliderClick}
                    />
                  </div>
                  <Plus
                    onClick={zoomIn}
                    className="dark:text-white cursor-pointer"
                  />
                </div>
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
