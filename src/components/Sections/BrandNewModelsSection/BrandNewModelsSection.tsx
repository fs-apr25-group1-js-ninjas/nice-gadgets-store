import { useEffect, useState, type FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import type { Product } from '../../../types/product';
import { getProducts } from '../../../utils/getProducts';
import { getNewestProducts } from '../../../utils/getNewestProducts';

export const BrandNewModelsSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const newestProducts = getNewestProducts(products);

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
