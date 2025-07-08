import type { FC } from 'react';
import styles from './BrandNewModelsSection.module.scss';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import { ProductCard } from '../../Product/ProductCard';
// import { ProductCard } from '../../Product/ProductCard';
// import type { Product } from '../../../types/product';

// type Props = {
//   products: Product[];
// };

export const BrandNewModelsSection: FC = () => {
  return (
    <section className={styles.brandNewModelsSection}>
      <h2>Brand new models</h2>
      <ProductCard />

      {/* {products.map(product => (
  <ProductCard
    key={product.id}
    product={product}
  />
))} */}
      <ProductsSlider />
    </section>
  );
};
