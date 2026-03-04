import { PRIVATE_SERVICES } from '@/constants/private/private.ts';
import type { PrivateService } from '@/types/private/private.ts';

export const getPrivateServices = (): PrivateService[] => {
  return PRIVATE_SERVICES;
};
