import type {
  DetailedProduct,
  DetailedProductsApiResponse,
} from '../types/detailedProduct';

export const fetchDetailedProductVariants = async (
  category: string,
  namespaceId: string,
): Promise<DetailedProduct[]> => {
  if (!category || !namespaceId) {
    throw new Error('Category or Product Namespace ID is missing.');
  }

  const detailedCategoryFileName = `${category.toLowerCase()}.json`;
  const response = await fetch(`/api/${detailedCategoryFileName}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Category data for "${category}" not found.`);
    }
    throw new Error(
      `Failed to fetch detailed category data: ${response.statusText}`,
    );
  }

  const allProductsInCategory: DetailedProductsApiResponse =
    await response.json();
  const variantsForNamespace = allProductsInCategory.filter(
    (p) => p.namespaceId === namespaceId,
  );

  if (variantsForNamespace.length === 0) {
    throw new Error(
      `Detailed product with namespace ID "${namespaceId}" not found in category "${category}".`,
    );
  }

  return variantsForNamespace;
};
