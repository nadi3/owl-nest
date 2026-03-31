/**
 * @file useThemeStore.ts
 * @description A Zustand store for managing the application's theme (light/dark mode).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Defines the state and actions for the theme management store.
 * @interface ThemeState
 */
interface ThemeState {
  /**
   * The current color mode of the application.
   * @type {'light' | 'dark'}
   */
  mode: 'light' | 'dark';
  /**
   * A function that toggles the color mode between 'light' and 'dark'.
   */
  toggleTheme: () => void;
}

/**
 * A Zustand store that manages the application's color theme (light or dark mode).
 *
 * This store provides a `mode` state and a `toggleTheme` action to switch between
 * themes. It uses the `persist` middleware from Zustand to automatically save the
 * user's theme preference to `localStorage`, ensuring it persists across sessions.
 *
 * @constant
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
