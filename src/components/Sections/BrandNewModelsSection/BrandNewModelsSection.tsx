import type { FC } from 'react';
import styles from './BrandNewModelsSection.module.scss';
import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const BrandNewModelsSection: FC = () => {
  return (
    <section className={styles.brandNewModelsSection}>
      <h2>Brand new models</h2>
      <ProductsSlider />
    </section>
  );
};
