/**
 * @file useAnonymizerStore.ts
 * @description A Zustand store for managing the state of the Face Anonymizer tool.
 */

import { create } from 'zustand';
import type { DetectedFace } from '@/types/tools/anonymizer.ts';

/**
 * Defines the state and actions for the Face Anonymizer tool.
 * @interface AnonymizerState
 */
interface AnonymizerState {
  /**
   * The data URL of the image currently loaded in the tool.
   * `null` if no image is loaded.
   * @type {string | null}
   */
  imageSrc: string | null;
  /**
   * An array of faces detected in the current image.
   * @type {DetectedFace[]}
   */
  faces: DetectedFace[];
  /**
   * A boolean flag indicating whether the face detection process is currently running.
   * @type {boolean}
   */
  isProcessing: boolean;
  /**
   * Sets the source URL for the image.
   * @param {string | null} src - The new image source URL.
   */
  setImageSrc: (src: string | null) => void;
  /**
   * Sets the array of detected faces.
   * @param {DetectedFace[]} faces - The new array of detected faces.
   */
  setFaces: (faces: DetectedFace[]) => void;
  /**
   * Sets the processing status.
   * @param {boolean} status - The new processing status.
   */
  setIsProcessing: (status: boolean) => void;
  /**
   * Toggles the `isBlurred` state for a specific face by its ID.
   * @param {string} id - The ID of the face to toggle.
   */
  toggleFaceBlur: (id: string) => void;
  /**
   * Resets the entire state to its initial values, effectively clearing the tool.
   */
  reset: () => void;
}

/**
 * A Zustand store that holds the state for the Face Anonymizer tool.
 *
 * This store manages the currently loaded image, the list of detected faces,
 * the processing status, and provides actions to manipulate this state.
 *
 * @constant
 */
export const useAnonymizerStore = create<AnonymizerState>((set) => ({
  imageSrc: null,
  faces: [],
  isProcessing: false,
  setImageSrc: (src) => set({ imageSrc: src }),
  setFaces: (faces) => set({ faces }),
  setIsProcessing: (status) => set({ isProcessing: status }),
  toggleFaceBlur: (id) =>
    set((state) => ({
      faces: state.faces.map((face) =>
        face.id === id ? { ...face, isBlurred: !face.isBlurred } : face
      ),
    })),
  reset: () => set({ imageSrc: null, faces: [], isProcessing: false }),
}));
