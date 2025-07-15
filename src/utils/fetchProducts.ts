import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchDetailedProduct,
  fetchFromCollection,
} from './firebaseUtils';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const client = {
  getAllProducts: async () => {
    await wait(100);
    return fetchAllProducts();
  },

  getProductsByCategory: async (category: string) => {
    await wait(100);
    return fetchProductsByCategory(category);
  },

  getDetailedProduct: async (category: string, itemId: string) => {
    await wait(100);
    return fetchDetailedProduct(category, itemId);
  },

  getFromCollection: async (collectionName: string) => {
    await wait(100);
    return fetchFromCollection(collectionName);
  },
};
