import ColorThief from "colorthief";

export async function getDominantColor(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const image = await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(blob);
  });

  const colorThief = new ColorThief();
  const dominantColor = colorThief.getColor(image);

  return dominantColor;
}
