import { PRIVATE_SERVICES } from '@/constants/private';
import type { PrivateService } from '@/types/private';

export const getPrivateServices = (): PrivateService[] => {
  return PRIVATE_SERVICES;
};
