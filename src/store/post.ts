import {create} from 'zustand'
import {Post} from "@/model/Post";

type PostStore = {
  myPosts: Post[],
  add: (data: Post) => void,
  remove: (id: number) => void,
  removeAll: () => void
}

export const usePostStore = create<PostStore>((set) => ({
  myPosts: [],
  add: (data: Post) => set((state) => ({myPosts: [...state.myPosts, data]})),
  remove: (id: number) => set((state) => ({myPosts: state.myPosts.filter((v) => v.postId !== id)})),
  removeAll: () => set({myPosts: []}),
}));