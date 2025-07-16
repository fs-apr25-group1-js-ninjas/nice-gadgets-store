import { useEffect, useState, type FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import type { UnifiedProduct } from '../../../types/unifiedProduct';
import { firebaseApi } from '../../../utils/fetchProducts';
import { getHotPricedProducts } from '../../../utils/getHotPricedProducts';

export const HotPricesSection: FC = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const productsWithDiscount = getHotPricedProducts(products);

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
      title={'Hot prices'}
      discount={true}
      products={productsWithDiscount}
    />
  );
};
