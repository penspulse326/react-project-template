import type { LoginResponse } from '~/services/user';
import { create } from 'zustand';

interface UserState {
  userProfile: LoginResponse | null;
  setUserProfile: (profile: LoginResponse | null) => void;
  clearUserProfile: () => void;
}

export const useUserStore = create<UserState>(set => ({
  userProfile: null,
  setUserProfile: profile => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));
