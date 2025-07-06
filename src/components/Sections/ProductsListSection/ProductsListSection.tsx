import type { FC } from 'react';
import styles from './ProductsListSection.module.scss';
import { ProductCard } from '../../Product/ProductCard';

export const ProductsListSection: FC = () => {
  return (
    <div className={styles.productsList}>
      <ProductCard />
    </div>
  );
};
