import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../utils/getProducts';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts<Product[]>(`./api/products.json`);
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products', error);
      }
    };

    fetchAllProducts();
  }, []);

  return { products };
};
