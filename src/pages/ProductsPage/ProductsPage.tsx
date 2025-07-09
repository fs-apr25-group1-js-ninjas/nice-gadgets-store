import type { FC } from 'react';

import { ProductsListSection } from '../../components/Sections/ProductsListSection';

import styles from './ProductsPage.module.scss';

export const ProductsPage: FC = () => {
  return (
    <div className={styles.phones}>
      <h1>Phones</h1>
      <ProductsListSection />
    </div>
  );
};
