import { useEffect, useState, type FC } from 'react';
import styles from './BrandNewModelsSection.module.scss';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import { ProductCard } from '../../Product/ProductCard';
import type { Product } from '../../../types/product';
import { getProducts } from '../../../utils/getProducts';

export const BrandNewModelsSection: FC = () => {
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

  return (
    <section className={styles.brandNewModelsSection}>
      <h2>Brand new models</h2>

      <div className={styles.cardsWrapper}>
        {products.map(
          (product, i) =>
            i < 4 && (
              <ProductCard
                key={product.id}
                product={product}
              />
            ),
        )}
      </div>

      <ProductsSlider />
    </section>
  );
};
