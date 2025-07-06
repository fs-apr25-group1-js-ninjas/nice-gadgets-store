import type { FC } from 'react';

import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import styles from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  return (
    <div className={styles.product}>
      <ProductOverviewSection />
      <ProductDescriptionSection />
      <RecommendedProductsSection />
    </div>
  );
};
