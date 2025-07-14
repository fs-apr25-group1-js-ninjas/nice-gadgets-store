import { useEffect, useState, type FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import type { Product } from '../../../types/product';
import { getProducts } from '../../../utils/getProducts';
import { getHotPricedProducts } from '../../../utils/getHotPricedProducts';

export const HotPricesSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productsWithDiscount = getHotPricedProducts(products);

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
      title={'Hot prices'}
      discount={true}
      products={productsWithDiscount}
    />
  );
};
