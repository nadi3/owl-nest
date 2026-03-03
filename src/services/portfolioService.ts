import { PORTFOLIO_DATA } from '@/constants/portfolio';
import type { Portfolio } from '@/types/portfolio';

export const getPortfolio = (): Portfolio[] => {
  return PORTFOLIO_DATA;
};
