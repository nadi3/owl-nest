import { PORTFOLIO_DATA } from '@/constants/portfolio/portfolio.ts';
import type { Portfolio } from '@/types/portfolio/portfolio.ts';

export const getPortfolio = (): Portfolio[] => {
  return PORTFOLIO_DATA;
};
