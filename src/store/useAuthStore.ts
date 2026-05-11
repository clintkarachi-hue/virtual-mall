import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  userRole: "customer" | "vendor" | "admin" | null;
  isApproved: boolean | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null, role?: "customer" | "vendor" | "admin" | null, isApproved?: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userRole: null,
  isApproved: undefined,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user, role, isApproved) =>
    set({ user, userRole: role, isApproved, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
