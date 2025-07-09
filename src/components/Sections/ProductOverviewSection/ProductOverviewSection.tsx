import type { FC } from 'react';

import { ProductGallerySection } from '../ProductGallerySection';
import { ProductActionsSection } from '../ProductActionsSection';

import styles from './ProductOverviewSection.module.scss';

export const ProductOverviewSection: FC = () => {
  return (
    <section className={styles.productOverviewSection}>
      <ProductGallerySection />
      <ProductActionsSection />
    </section>
  );
};
