import { create } from 'zustand';
import type { AudioVisualizerState } from '@/types/tools/audioVisualizer.ts';
import { owlTheme } from '@/theme/theme.ts';
import { audioVisualizerService } from '@/services/tools/audioVisualizerService.ts';

/**
 * @description Zustand store to manage the state of the 3D Audio Visualizer.
 * Handles the loaded file, play state, and visual preferences.
 * Triggers side effects in the audioVisualizerService.
 */
export const useAudioVisualizerStore = create<AudioVisualizerState>((set) => ({
  audioFile: null,
  isPlaying: false, // On remet à false par défaut
  settings: {
    backgroundColor: owlTheme.palette.background.default,
    bassColor: owlTheme.palette.primary.main,
    midColor: owlTheme.palette.error.main,
    trebleColor: owlTheme.palette.secondary.main,
    shape: 'line',
    opacity: 0.85,
  },

  setAudioFile: (file) => {
    if (file) {
      audioVisualizerService.loadAudio(file);
      set({ audioFile: file, isPlaying: true });
      audioVisualizerService.play();
    } else {
      set({ audioFile: null, isPlaying: false });
      audioVisualizerService.pause();
    }
  },

  setIsPlaying: (isPlaying) => {
    set({ isPlaying });
    if (isPlaying) {
      audioVisualizerService.play();
    } else {
      audioVisualizerService.pause();
    }
  },

  updateSetting: (key, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),
}));
