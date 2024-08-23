import { create } from "zustand";

export const useFullScreenImage = create((set) => ({
  isFullScreen: true,
  setFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
  setManualScreen: (active) => set({ isFullScreen: active }),
}));
