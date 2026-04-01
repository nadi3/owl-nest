/**
 * @file audioVisualizerService.ts
 * @description A singleton service for managing the Web Audio API logic for the audio visualizer.
 * This service handles audio loading, playback, and frequency analysis.
 */

/**
 * A singleton class that encapsulates the logic for the Web Audio API.
 *
 * This service is responsible for:
 * - Initializing the `AudioContext`, `AnalyserNode`, and other required audio nodes.
 * - Loading and managing the audio source from a user-provided file.
 * - Controlling audio playback (play/pause).
 * - Providing real-time frequency data from the audio stream.
 *
 * It is designed to be a single, persistent instance throughout the application's lifecycle.
 */
class AudioVisualizerService {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;

  private forcedData: Uint8Array | null = null;

  private init() {
    if (this.audioContext) return;

    this.audio = new Audio();

    const AudioContextClass = globalThis.AudioContext || (globalThis as any).webkitAudioContext;
    this.audioContext = new AudioContextClass();

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  /**
   * Loads a new audio file for playback and analysis.
   * It ensures the audio context is initialized, revokes any previously loaded
   * object URLs to prevent memory leaks, and sets the new file as the audio source.
   * @param {File} file - The audio file to load.
   */
  public loadAudio(file: File) {
    this.init();

    if (this.audio?.src) {
      URL.revokeObjectURL(this.audio.src);
    }

    const objectUrl = URL.createObjectURL(file);
    if (this.audio) {
      this.audio.src = objectUrl;
      this.audio.load();
    }
  }

  /**
   * Starts or resumes audio playback.
   * It also ensures the `AudioContext` is resumed if it was suspended by browser policy.
   */
  public play() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    this.audio?.play();
  }

  /**
   * Pauses the currently playing audio.
   */
  public pause() {
    this.audio?.pause();
  }

  public setForcedFrequencyData(data: Uint8Array | null) {
    this.forcedData = data;
  }

  public getFrequencyData(): Uint8Array | null {
    if (this.forcedData) return this.forcedData;

    if (!this.analyser || !this.dataArray) return null;

    this.analyser.getByteFrequencyData(this.dataArray as any);
    return this.dataArray;
  }
}

/**
 * The singleton instance of the AudioVisualizerService.
 * This instance is exported and used throughout the application to interact
 * with the audio visualizer's core logic.
 * @constant
 */
export const audioVisualizerService = new AudioVisualizerService();
