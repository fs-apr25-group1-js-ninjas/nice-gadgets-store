import type { FC } from 'react';

import { ProductsListSection } from '../../components/Sections/ProductsListSection';

import styles from './FavouritesPage.module.scss';

export const FavouritesPage: FC = () => {
  return (
    <div className={styles.favorites}>
      <h1>Favourites</h1>
      <ProductsListSection />
    </div>
  );
};
