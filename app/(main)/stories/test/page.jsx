"use client";

import React, { useRef, useState } from "react";

const CustomImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    width: 300,
    height: 300,
  });
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1); // Added for zoom functionality
  const [dragging, setDragging] = useState(false); // Flag to track dragging state
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Load the selected image
  const handleImageLoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Scale the crop data by the current zoom level
    const { x, y, width, height } = cropData;

    const image = imageRef.current;

    // Set canvas size to the crop area
    canvas.width = width;
    canvas.height = height;

    // Draw the cropped area onto the canvas considering the scale
    ctx.drawImage(
      image,
      x / scale, // Adjust the x-coordinate based on the zoom scale
      y / scale, // Adjust the y-coordinate based on the zoom scale
      width / scale, // Adjust the width based on the zoom scale
      height / scale, // Adjust the height based on the zoom scale
      0,
      0,
      width,
      height
    );

    // Get the cropped image as a base64 string
    const croppedImageBase64 = canvas.toDataURL("image/png");

    console.log("Cropped Image Data URL:", croppedImageBase64);
    setCroppedImage(croppedImageBase64);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = croppedImage; // Use the base64 or Blob URL
    link.download = "cropped-image.png";
    link.click();
  };

  // Zoom functions
  const zoomIn = () => setScale((prevScale) => prevScale + 0.1);
  const zoomOut = () =>
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setCropData((prevData) => ({
      ...prevData,
      x: prevData.x + dx,
      y: prevData.y + dy,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      <h3>Custom Image Cropper</h3>
      <input type="file" accept="image/*" onChange={handleImageLoad} />
      {imageSrc && (
        <>
          {/* Display the original image */}
          <div className="flex flex-col items-center">
            <h4>Original Image</h4>
            <div
              style={{
                display: "inline-block",
                overflow: "hidden",
                border: "1px solid #ccc",
                width: "300px",
                height: "300px",
                position: "relative",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={imageSrc}
                alt="Source"
                ref={imageRef}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                  position: "absolute",
                  left: cropData.x,
                  top: cropData.y,
                }}
              />
            </div>
          </div>
          <div>
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={zoomOut} style={{ marginLeft: "10px" }}>
              Zoom Out
            </button>
          </div>

          {/* Inputs to adjust crop parameters */}
          <div>
            <button onClick={handleCrop}>Crop</button>
          </div>

          {/* Canvas to display cropped image */}
          <div className="flex flex-col items-center ">
            <h4>Cropped Image</h4>
            <canvas
              ref={canvasRef}
              style={{ border: "1px solid black" }}
            ></canvas>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomImageCropper;
