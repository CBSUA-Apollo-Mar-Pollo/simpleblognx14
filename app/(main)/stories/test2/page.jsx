"use client";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

export default function FixedCropArea() {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const cropRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Drag Image Beyond Crop Area</h1>
      <input type="file" onChange={handleFileChange} />
      <div
        style={{
          position: "relative",
          width: "400px", // Width of the crop area
          height: "300px", // Height of the crop area
          margin: "20px auto",
          border: "2px dashed #ccc",
          overflow: "hidden", // Ensures the image is clipped to this area
        }}
        ref={cropRef}
      >
        {image && (
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
        )}
      </div>
      <button onClick={handleCrop} style={{ marginTop: "10px" }}>
        Crop Image
      </button>
    </div>
  );
}
