import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    isAuthenticated: false,
    token: null,
    user: null,

    logIn: (token: string) => set({ isAuthenticated: true, token: token }),
    logOut: () => set({ isAuthenticated: false, token: null }),
    setUser: (user: any) => set({ user: user })
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage)
  }
));

export { useAuthStore }