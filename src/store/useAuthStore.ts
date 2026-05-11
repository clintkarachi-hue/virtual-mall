import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  userRole: "customer" | "vendor" | "admin" | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null, role: "customer" | "vendor" | "admin" | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userRole: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user, role) =>
    set({ user, userRole: role, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
