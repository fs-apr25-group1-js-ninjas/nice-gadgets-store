import type { FC } from 'react';

import { ProductOverviewSection } from '../../components/Sections/ProductOverviewSection';
import { ProductDescriptionSection } from '../../components/Sections/ProductDescriptionSection';
import { RecommendedProductsSection } from '../../components/Sections/RecommendedProductsSection';

import styles from './ProductPage.module.scss';

export const ProductPage: FC = () => {
  return (
    <div className={styles.productPage}>
      <a
        href="#"
        className={styles.back}
      >
        Back
      </a>
      <h1 className={styles.productPageTitle}>
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h1>
      <div className={styles.productPageContent}>
        <ProductOverviewSection />
        <ProductDescriptionSection />
        <RecommendedProductsSection />
      </div>
    </div>
  );
};
