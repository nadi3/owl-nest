/**
 * @file useImpatienceStore.ts
 * @description A Zustand store for managing the state related to the "impatience" detection feature.
 */

import { create } from 'zustand';
import type { ImpatienceState } from '@/types/useless/impatience.ts';

/**
 * A Zustand store that holds the state for the impatience detection feature.
 *
 * This store provides a simple boolean flag, `isImpatienceDetected`, which is
 * set to `true` by the `useImpatienceDetector` hook when impatient behavior
 * is detected. The `ImpatiencePopup` component subscribes to this state to
 * know when to display itself.
 *
 * @constant
 */
export const useImpatienceStore = create<ImpatienceState>((set) => ({
  isImpatienceDetected: false,
  setImpatienceDetected: (detected) => set({ isImpatienceDetected: detected }),
}));
