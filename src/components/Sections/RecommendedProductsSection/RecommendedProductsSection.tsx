import type { FC } from 'react';
import { ProductsSlider } from '../../Sliders/ProductsSlider';
import styles from './RecommendedProductsSection.module.scss';

export const RecommendedProductsSection: FC = () => {
  return (
    <section className={styles.recommendedProductsSection}>
      <h2>You may also like</h2>
      <ProductsSlider />
    </section>
  );
};
