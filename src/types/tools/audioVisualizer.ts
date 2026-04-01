/**
 * @file audioVisualizer.ts
 * @description Type definitions for the 3D Audio Visualizer tool.
 */

export type VisualizerShape = 'line' | 'circle';

export interface VisualizerSettings {
  /** Color for the 3D canvas background. */
  backgroundColor: string;
  /** Color representing low frequencies (bass). */
  bassColor: string;
  /** Color representing middle frequencies (mids). */
  midColor: string;
  /** Color representing high frequencies (treble). */
  trebleColor: string;
  /** The shape pattern of the audio visualizer. */
  shape: VisualizerShape;
  /** The opacity of the rendered frequency waves (0 to 1). */
  opacity: number;
  /** Determines if the center image is displayed */
  showImage: boolean;
  /** URL (blob) of the uploaded image. Null = logo by default */
  customImage: string | null;
}

export interface AudioVisualizerState {
  /** The currently loaded audio file, if any. */
  audioFile: File | null;
  /** Indicates if the audio is currently playing. */
  isPlaying: boolean;
  /** User-defined visualization settings. */
  settings: VisualizerSettings;

  exportStatus: 'idle' | 'analyzing' | 'rendering' | 'muxing';
  exportProgress: number;

  setAudioFile: (file: File | null) => void;
  /** Toggles the play/pause state of the visualizer. */
  setIsPlaying: (isPlaying: boolean) => void;
  /** Updates a specific setting in the visualizer configuration. */
  updateSetting: <K extends keyof VisualizerSettings>(key: K, value: VisualizerSettings[K]) => void;

  startExport: () => void;
  setExportStatus: (status: 'idle' | 'analyzing' | 'rendering' | 'muxing') => void;
  setExportProgress: (progress: number) => void;
  completeExport: (url: string) => void;
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seek: (time: number) => void;
}
