import type { FC } from 'react';

import { ProductsListSection } from '../../components/Sections/ProductsListSection';

import styles from './PhonesPage.module.scss';

export const PhonesPage: FC = () => {
  return (
    <div className={styles.phones}>
      <h1>Phones</h1>
      <ProductsListSection />
    </div>
  );
};
