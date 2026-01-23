"use client";

import ColorThief from "colorthief";

export async function getDominantColor(imageUrl) {
  if (!imageUrl) return null;

  // Check if we're in a browser environment
  if (typeof Image === "undefined") {
    console.warn(
      "getDominantColor: Image API not available in this environment",
    );
    return null;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = objectUrl;
    });

    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(image);

    URL.revokeObjectURL(objectUrl);

    return dominantColor;
  } catch (error) {
    console.error("Color extraction error:", error);
    return null;
  }
}
