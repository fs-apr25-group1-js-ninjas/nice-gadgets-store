import type { FC } from 'react';
import type { Product } from '../../../types/product';
import { ProductCard } from '../../Product/ProductCard';
import styles from './ProductsListSection.module.scss';

interface ProductsListSectionProps {
  filteredProducts: Product[];
}

export const ProductsListSection: FC<ProductsListSectionProps> = ({
  filteredProducts,
}) => {
  return (
    <div className={styles.productsList}>
      {filteredProducts.map((product) => (
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
