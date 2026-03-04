import { PUBLIC_TOOLS } from '@/constants/tools/tools.ts';
import type { PublicTool } from '@/types/tools/tools.ts';

export const getPublicTools = (): PublicTool[] => {
  return PUBLIC_TOOLS;
};
