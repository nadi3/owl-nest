import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * Custom hook to manage the application's color mode (light/dark).
 * Uses local storage persistence via Zustand middleware.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleTheme: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'owl-nest-theme' }
  )
);
