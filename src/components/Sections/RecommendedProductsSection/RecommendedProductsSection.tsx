import { useEffect, useState, type FC } from 'react';

import type { UnifiedProduct } from '../../../types/unifiedProduct';
import { firebaseApi } from '../../../utils/fetchProducts';

import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const RecommendedProductsSection: FC = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await firebaseApi.getAllProducts();
        setProducts(data);
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
