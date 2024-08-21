import { create } from "zustand";

export const useChatWindowStore = create((set) => ({
  data: [],
  onOpen: (type, newData = []) =>
    set((state) => {
      // Filter out duplicates from newData
      const uniqueNewData = newData.filter(
        (item) => !state.data.includes(item)
      );

      return {
        type,
        data: [...state.data, ...uniqueNewData], // Accumulate unique new data
      };
    }),
  onClose: (id) =>
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    })),
}));
