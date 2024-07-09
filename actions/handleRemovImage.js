"use server";

import { UTApi } from "uploadthing/server";

export const handleRemoveImage = async (key) => {
  try {
    console.log(key);
    const utapi = new UTApi();
    await utapi.deleteFiles(key);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
