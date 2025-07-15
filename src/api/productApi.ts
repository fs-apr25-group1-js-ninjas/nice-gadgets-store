import type {
  DetailedProduct,
  DetailedProductsApiResponse,
} from '../types/detailedProduct';

export const fetchDetailedProductVariants = async (
  category: string,
  namespaceId: string,
): Promise<DetailedProduct[] | null> => {
  if (!category || !namespaceId) {
    return null;
  }

  const detailedCategoryFileName = `${category.toLowerCase()}.json`;
  let response;

  try {
    response = await fetch(`/api/${detailedCategoryFileName}`);
  } catch (error) {
    console.error('Network error during fetch:', error);
    throw new Error(
      'Network error: Could not connect to the server for category data.',
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(
      `Server error (${response.status}) while fetching detailed category data for "${category}".`,
    );
  }

  let allProductsInCategory: DetailedProductsApiResponse;
  try {
    allProductsInCategory = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('JSON parsing error:', error);
      return null;
    }
    console.error('Unexpected error during JSON processing:', error);
    throw new Error('An unexpected error occurred during data processing.');
  }

  const variantsForNamespace = allProductsInCategory.filter(
    (p) => p.namespaceId === namespaceId,
  );

  if (variantsForNamespace.length === 0) {
    return null;
  }

  return variantsForNamespace;
};
