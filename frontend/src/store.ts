import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./lib/types.ts";

// Define Auth State & Actions
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

// Zustand store with persist
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Login function (store token & user)
      login: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },

      // Logout function (clear token & user)
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      setUser: (user) => {
        set({ user });
      },
    }),

    {
      name: "auth-storage",
    }
  )
);

interface DateState {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  setFromDate: (date: Date | undefined) => void;
  setToDate: (date: Date | undefined) => void;
}

export const useDateStore = create<DateState>((set) => ({
  fromDate: undefined,
  toDate: undefined,
  setFromDate: (date) => set({ fromDate: date }),
  setToDate: (date) => set({ toDate: date }),
}));

interface Guest {
  name: string;
  aadhar: string;
}

interface GuestState {
  numGuests: number;
  guests: Guest[];
  setNumGuests: (num: number) => void;
  updateGuest: (index: number, field: keyof Guest, value: string) => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  numGuests: 1,
  guests: [{ name: "", aadhar: "" }],

  setNumGuests: (num) =>
    set((state) => ({
      numGuests: num,
      guests: Array.from(
        { length: num },
        (_, i) => state.guests[i] || { name: "", aadhar: "" }
      ),
    })),

  updateGuest: (index, field, value) =>
    set((state) => {
      const updatedGuests = [...state.guests];
      updatedGuests[index] = { ...updatedGuests[index], [field]: value };
      return { guests: updatedGuests };
    }),
}));
