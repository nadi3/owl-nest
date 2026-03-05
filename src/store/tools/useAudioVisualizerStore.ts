import { create } from 'zustand';
import type { AudioVisualizerState } from '@/types/tools/audioVisualizer.ts';

/**
 * @description Zustand store to manage the state of the 3D Audio Visualizer.
 * Handles the loaded file, play state, and visual preferences.
 */
export const useAudioVisualizerStore = create<AudioVisualizerState>((set) => ({
  audioFile: null,
  isPlaying: true,
  settings: {
    backgroundColor: '#0a0a0a', // Dark background to make colors pop
    bassColor: '#ff3366', // Red/Pink for bass
    midColor: '#33ccff', // Blue/Cyan for mids
    trebleColor: '#ffff33', // Yellow for treble
    shape: 'line',
  },
  // TODO: Implement actual setters in the next phase
  setAudioFile: () => {},
  setIsPlaying: () => {},
  updateSetting: () => {},
}));
