import { USELESS_WIDGETS } from '@/constants/useless/useless.ts';
import type { UselessWidget } from '@/types/useless/useless.ts';

export const getUselessWidgets = (): UselessWidget[] => {
  return USELESS_WIDGETS;
};
