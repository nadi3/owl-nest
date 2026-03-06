import { create } from 'zustand';
import type { ImpatienceState } from '@/types/useless/impatience.ts';

export const useImpatienceStore = create<ImpatienceState>((set) => ({
  isImpatienceDetected: false,
  setImpatienceDetected: (detected) => set({ isImpatienceDetected: detected }),
}));
