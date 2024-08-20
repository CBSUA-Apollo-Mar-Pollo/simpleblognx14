import { create } from "zustand";

export const useChatWindowStore = create((set) => ({
  type: null,
  data: [],
  isOpen: false,
  onOpen: (type, newData = []) =>
    set((state) => {
      // Filter out duplicates from newData
      const uniqueNewData = newData.filter(
        (item) => !state.data.includes(item)
      );

      return {
        isOpen: true,
        type,
        data: [...state.data, ...uniqueNewData], // Accumulate unique new data
      };
    }),
  onClose: () => set({ type: null, isOpen: false }),
}));
