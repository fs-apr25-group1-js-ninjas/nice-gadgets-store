import { useEffect, useState, type FC } from 'react';

import type { Product } from '../../../types/product';
import { firebaseApi } from '../../../utils/fetchProducts';

import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const RecommendedProductsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await firebaseApi.getAllProducts();
        const shuffledProducts = shuffleArray(data);
        const randomProducts = shuffledProducts.slice(0, 20);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Cannot load products from Firebase:', error);
      }
    };

    loadProducts();
  }, []);

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <ProductsSlider
      title={'You may also like'}
      products={products}
    />
  );
};
