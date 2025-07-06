import type { FC } from 'react';
import styles from './HotPricesSection.module.scss';
import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const HotPricesSection: FC = () => {
  return (
    <section className={styles.hotPricesSection}>
      <h2>Hot prices</h2>
      <ProductsSlider />
    </section>
  );
};
