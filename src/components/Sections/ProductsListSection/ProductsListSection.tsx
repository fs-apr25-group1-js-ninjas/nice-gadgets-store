import type { FC } from 'react';
import styles from './ProductsListSection.module.scss';
import { ProductCard } from '../../Product/ProductCard';
import type { Product } from '../../../types/product';

interface Props {
  product: Product;
}

export const ProductsListSection: FC<Props> = ({ product }) => {
  return (
    <div className={styles.productsList}>
      <ProductCard product={product} />
    </div>
  );
};
