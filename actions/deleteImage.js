"use server";
import { UTApi } from "uploadthing/server";

export const deleteImage = async (image) => {
  const utapi = new UTApi();
  await utapi.deleteFiles(image.key);
};
