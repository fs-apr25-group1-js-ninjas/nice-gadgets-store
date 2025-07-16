import type { UnifiedProduct } from '../types/unifiedProduct';

export const sortProducts = (products: UnifiedProduct[], sortBy: string) => {
  switch (sortBy) {
    case 'newest':
      return [...products].sort((a, b) => b.year - a.year);
    case 'oldest':
      return [...products].sort((a, b) => a.year - b.year);
    case 'lowestPrice':
      return [...products].sort((a, b) => a.price - b.price);
    case 'highestPrice':
      return [...products].sort((a, b) => b.price - a.price);
    case 'alphabetically':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
};
