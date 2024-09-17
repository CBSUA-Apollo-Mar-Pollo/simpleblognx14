import { create } from "zustand";

export const useToggleCommentSection = create((set) => ({
  isToggleCommentSection: false,
  setToggled: () =>
    set((state) => ({ isToggleCommentSection: !state.isToggleCommentSection })),
}));
