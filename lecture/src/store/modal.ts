import {create} from "zustand";
import {Post} from "@/model/Post";

interface ModalState {
  mode: 'new' | 'comment',
  data: Post | null,
  setMode(mode: 'new' | 'comment'): void;
  setData(data: Post): void;
  reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({
  mode: 'new',
  data: null,
  setMode(mode) {
    set({ mode });
  },
  setData(data) {
    set({ data });
  },
  reset() {
    set({
      mode: 'new',
      data: null,
    })
  }
}));