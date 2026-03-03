import { PUBLIC_SERVICES } from '@/constants/public';
import type { PublicService } from '@/types/public';

export const getPublicServices = (): PublicService[] => {
  return PUBLIC_SERVICES;
};
