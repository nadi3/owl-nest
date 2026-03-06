import { create } from 'zustand';
import type { DetectedFace } from '@/types/tools/anonymizer.ts';

interface AnonymizerState {
  imageSrc: string | null;
  faces: DetectedFace[];
  isProcessing: boolean;
  setImageSrc: (src: string | null) => void;
  setFaces: (faces: DetectedFace[]) => void;
  setIsProcessing: (status: boolean) => void;
  toggleFaceBlur: (id: string) => void;
  reset: () => void;
}

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
