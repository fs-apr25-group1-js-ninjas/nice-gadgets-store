import type { UnifiedProduct } from '../types/unifiedProduct';

export const getNewestProducts = (
  products: UnifiedProduct[],
): UnifiedProduct[] => {
  return [...products].sort((a, b) => b.year - a.year).slice(0, 20);
};
