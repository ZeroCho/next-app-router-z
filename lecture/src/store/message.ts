import {create} from "zustand";

interface ModalState {
  shouldGoDown: boolean;
  setGoDown(bool: boolean): void;
  reset(): void;
}

export const useMessageStore = create<ModalState>((set) => ({
  shouldGoDown: false,
  setGoDown(bool) {
    set({ shouldGoDown: bool });
  },
  reset() {
    set({
      shouldGoDown: false
    });
  }
}));