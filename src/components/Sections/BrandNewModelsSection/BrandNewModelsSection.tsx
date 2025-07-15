import { useEffect, useState, type FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import type { Product } from '../../../types/product';
import { firebaseApi } from '../../../utils/fetchProducts';
import { getNewestProducts } from '../../../utils/getNewestProducts';

export const BrandNewModelsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const newestProducts = getNewestProducts(products);

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
      title={'Brand new models'}
      products={newestProducts}
      discount={false}
    />
  );
};
