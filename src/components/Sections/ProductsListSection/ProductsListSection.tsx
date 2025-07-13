import type { FC } from 'react';
import type { Product } from '../../../types/product';
import { ProductCard } from '../../Product/ProductCard';
import styles from './ProductsListSection.module.scss';

interface ProductsListSectionProps {
  productsFromServer: Product[];
}

export const ProductsListSection: FC<ProductsListSectionProps> = ({
  productsFromServer,
}) => {
  return (
    <div className={styles.productsList}>
      {productsFromServer.map((product) => (
        <div
          key={product.id}
          className={styles.card}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
