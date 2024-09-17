import { create } from "zustand";

export const useScrollTracker = create((set) => ({
  scrolledNumber: true,
  setScrolledNumber: (number) => set(() => ({ scrolledNumber: number })),
}));
