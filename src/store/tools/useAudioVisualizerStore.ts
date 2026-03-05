import { create } from 'zustand';
import type { AudioVisualizerState } from '@/types/tools/audioVisualizer.ts';
import { owlTheme } from '@/theme/theme.ts';

/**
 * @description Zustand store to manage the state of the 3D Audio Visualizer.
 * Handles the loaded file, play state, and visual preferences.
 */
export const useAudioVisualizerStore = create<AudioVisualizerState>((set) => ({
  audioFile: null,
  isPlaying: true,
  settings: {
    backgroundColor: owlTheme.palette.background.default,
    bassColor: owlTheme.palette.primary.main,
    midColor: owlTheme.palette.error.main,
    trebleColor: owlTheme.palette.secondary.main,
    shape: 'line',
  },

  setAudioFile: (file) => set({ audioFile: file }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  updateSetting: (key, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),
}));
