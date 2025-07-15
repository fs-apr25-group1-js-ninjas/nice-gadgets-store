import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../utils/getProducts';

const API = './api/products.json';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts<Product[]>(API);
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return { products, isLoading };
};
