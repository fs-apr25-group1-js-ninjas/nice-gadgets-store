import type { Product } from '../types/product';

export const sortProducts = (products: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'newest':
      return [...products].sort((a, b) => b.year - a.year);
    case 'oldest':
      return [...products].sort((a, b) => a.year - b.year);
    case 'lowestPrice':
      return [...products].sort((a, b) => a.price - b.price);
    case 'highestPrice':
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};
