import { useEffect, useState, type FC } from 'react';

import type { Product } from '../../../types/product';
import { getProducts } from '../../../utils/getProducts';

import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const RecommendedProductsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts<Product[]>(`/api/products.json`);
        setProducts(data);
      } catch (error) {
        console.error('Cannot load products', error);
      }
    };

    fetchAllProducts();
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
