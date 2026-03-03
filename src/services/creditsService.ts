import { CREDITS_DATA } from '@/constants/credits';
import type { Credit } from '@/types/credits';

export const getCredits = (): Credit[] => {
  return CREDITS_DATA;
};
