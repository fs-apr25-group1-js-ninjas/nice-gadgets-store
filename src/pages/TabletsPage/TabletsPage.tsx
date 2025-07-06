import type { FC } from 'react';

import { ProductsListSection } from '../../components/Sections/ProductsListSection';

import styles from './TabletsPage.module.scss';

export const TabletsPage: FC = () => {
  return (
    <div className={styles.tablets}>
      <h1>Tablets</h1>
      <ProductsListSection />
    </div>
  );
};
