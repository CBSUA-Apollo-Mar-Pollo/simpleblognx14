import { create } from "zustand";

export const useChatWindowStore = create((set) => ({
  data: [],
  minimizedChats: [],
  onOpen: (type, newData = []) =>
    set((state) => {
      // Filter out duplicates from newData
      const uniqueNewData = newData.filter(
        (item) =>
          !state.data.some((existingItem) => existingItem.id === item.id) &&
          !state.minimizedChats.some(
            (existingItem) => existingItem.id === item.id
          )
      );

      return {
        type,
        data: [...state.data, ...uniqueNewData], // Accumulate unique new data
      };
    }),
  onClose: (id) =>
    set((state) => {
      // Remove chat from data and minimizedChats
      const newData = state.data.filter((item) => item.id !== id);
      const newMinimizedChats = state.minimizedChats.filter(
        (item) => item.id !== id
      );

      return {
        data: newData,
        minimizedChats: newMinimizedChats,
      };
    }),
  onMinimizeClose: (id) =>
    set((state) => {
      // Find the chat item to minimize
      const chatToMinimize = state.data.find((item) => item.id === id);

      if (!chatToMinimize) return state; // No chat found with this id

      return {
        data: state.data.filter((item) => item.id !== id),
        minimizedChats: [...state.minimizedChats, chatToMinimize],
      };
    }),
  onMinimizeOpen: (id) =>
    set((state) => {
      // Find the chat item to open from minimizedChats
      const chatToOpen = state.minimizedChats.find((item) => item.id === id);

      if (!chatToOpen) return state; // No chat found with this id

      return {
        data: [...state.data, chatToOpen],
        minimizedChats: state.minimizedChats.filter((item) => item.id !== id),
      };
    }),
}));
