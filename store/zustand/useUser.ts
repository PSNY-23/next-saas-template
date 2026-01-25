import {create} from 'zustand';

export const useUser = create((set) => ({
  user: null,
  removeUser: () => set({ user: null }),
}));