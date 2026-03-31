/**
 * @file useAudioVisualizerStore.ts
 * @description A Zustand store for managing the state of the 3D Audio Visualizer tool.
 */

import { create } from 'zustand';
import type { AudioVisualizerState } from '@/types/tools/audioVisualizer.ts';
import { getOwlTheme } from '@/theme/theme.ts';
import { audioVisualizerService } from '@/services/tools/audioVisualizerService.ts';

const initialTheme = getOwlTheme('light');

/**
 * A Zustand store that holds the state for the 3D Audio Visualizer tool.
 *
 * This store manages the currently loaded audio file, the playback status, and all
 * visual settings for the visualizer, such as colors, shape, and opacity.
 *
 * It also acts as a controller, calling methods on the `audioVisualizerService`
 * to trigger side effects like loading, playing, or pausing the audio in response
 * to state changes.
 *
 * @constant
 */
export const useAudioVisualizerStore = create<AudioVisualizerState>((set) => ({
  audioFile: null,
  isPlaying: false, // On remet à false par défaut
  settings: {
    backgroundColor: initialTheme.palette.background.default,
    bassColor: initialTheme.palette.primary.main,
    midColor: initialTheme.palette.error.main,
    trebleColor: initialTheme.palette.secondary.main,
    shape: 'line',
    opacity: 0.85,
    showImage: true,
    customImage: null,
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
