import type { FC } from 'react';

import { ProductsListSection } from '../../components/Sections/ProductsListSection';

import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage: FC = () => {
  return (
    <div className={styles.accessories}>
      <h1>Accessories</h1>

      <ProductsListSection />
    </div>
  );
};
