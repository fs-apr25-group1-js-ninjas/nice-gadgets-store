import { useEffect, useState } from 'react';
import type { UnifiedProduct } from '../types/unifiedProduct';
import { firebaseApi } from '../utils/fetchProducts';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await firebaseApi.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products from Firebase:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, isLoading };
};
