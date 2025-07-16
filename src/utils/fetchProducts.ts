import {
  fetchDetailedProduct,
  fetchFromCollection,
  fetchDetailedProductVariants,
  fetchUnifiedProducts,
  fetchUnifiedProductsByCategory,
} from './firebaseUtils';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const firebaseApi = {
  getAllProducts: async () => {
    await wait(300);
    return fetchUnifiedProducts();
  },

  getProductsByCategory: async (category: string) => {
    await wait(300);
    return fetchUnifiedProductsByCategory(category);
  },

  getDetailedProduct: async (category: string, itemId: string) => {
    await wait(300);
    return fetchDetailedProduct(category, itemId);
  },

  getFromCollection: async (collectionName: string) => {
    await wait(300);
    return fetchFromCollection(collectionName);
  },

  getDetailedProductVariants: async (category: string, namespaceId: string) => {
    await wait(300);
    return fetchDetailedProductVariants(category, namespaceId);
  },
};

export { fetchDetailedProductVariants } from './firebaseUtils';
