import { USELESS_WIDGETS } from '@/constants/useless';
import type { UselessWidget } from '@/types/useless';

export const getUselessWidgets = (): UselessWidget[] => {
  return USELESS_WIDGETS;
};
