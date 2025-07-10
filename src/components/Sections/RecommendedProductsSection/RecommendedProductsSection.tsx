import type { FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import styles from './RecommendedProductsSection.module.scss';

export const RecommendedProductsSection: FC = () => {
  return (
    <section className={styles.recommendedProductsSection}>
      <h2 className={styles.sectionTitle}>You may also like</h2>
      <ProductsSlider
        title="Recommended Products"
        products={[]}
      />
    </section>
  );
};
