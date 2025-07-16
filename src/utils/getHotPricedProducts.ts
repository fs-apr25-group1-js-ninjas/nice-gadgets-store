import type { UnifiedProduct } from '../types/unifiedProduct';

export const getHotPricedProducts = (
  products: UnifiedProduct[],
): UnifiedProduct[] => {
  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);
};
