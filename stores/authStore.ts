import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore } from '@/types';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
    }),
    { 
      name: 'odyssey-auth',
      onRehydrateStorage: () => (state, error) => {
        if (error || !state?.user) {
          state?.setLoading(false);
        }
      },
    }
  )
);