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
export const useAudioVisualizerStore = create<AudioVisualizerState>()((set, get) => ({
  audioFile: null,
  isPlaying: false,

  exportStatus: 'idle',
  exportProgress: 0,

  currentTime: 0,
  duration: 0,

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

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  seek: (time) => {
    audioVisualizerService.seek(time);
    set({ currentTime: time });
  },

  setAudioFile: (file) => {
    if (file) {
      audioVisualizerService.loadAudio(file);
      set({ audioFile: file, isPlaying: true, exportStatus: 'idle', exportProgress: 0 });
      audioVisualizerService.play();
    } else {
      set({ audioFile: null, isPlaying: false, exportStatus: 'idle' });
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

  startExport: () => {
    const { audioFile } = get();
    if (audioFile) {
      audioVisualizerService.pause(); // Coupe la musique pendant l'export
      set({ isPlaying: false, exportStatus: 'analyzing', exportProgress: 0 });
    }
  },

  setExportStatus: (status) => set({ exportStatus: status }),

  setExportProgress: (progress) => set({ exportProgress: progress }),

  completeExport: (url) => {
    set({ exportStatus: 'idle', exportProgress: 0 });
    const a = document.createElement('a');
    a.href = url;
    a.download = 'owl-nest-visualizer.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
}));
