import type { UnifiedProduct } from '../types/unifiedProduct';

export function getProductsByCategory(
  category: string | undefined,
  allCategories: string[],
  products: UnifiedProduct[],
) {
  if (!category || !allCategories.includes(category)) {
    return [];
  }

  return products.filter((product) => product.category === category);
}
