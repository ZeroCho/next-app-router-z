import {create} from 'zustand'
import {User} from "@/model/User";

type UserStore = {
  me: User | null,
  add: (data: User) => void,
  remove: () => void,
}

export const useUserStore = create<UserStore>((set) => ({
  me: null,
  add: (data: User) => set((state) => ({me: data})),
  remove: () => set((state) => ({me: null})),
}));