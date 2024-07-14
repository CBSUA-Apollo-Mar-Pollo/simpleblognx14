"use server";

import { UTApi } from "uploadthing/server";

export const handleRemoveImage = async (key) => {
  try {
    const utapi = new UTApi();
    await utapi.deleteFiles(key);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
