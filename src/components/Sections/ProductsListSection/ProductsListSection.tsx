import type { FC } from 'react';
import type { UnifiedProduct } from '../../../types/unifiedProduct';
import { ProductCard } from '../../Product/ProductCard';
import { SkeletonCard } from '../../Skeleton';
import styles from './ProductsListSection.module.scss';

interface ProductsListSectionProps {
  isLoading: boolean;
  productsFromServer: UnifiedProduct[];
  itemsOnPage: string | number;
}

export const ProductsListSection: FC<ProductsListSectionProps> = ({
  isLoading,
  productsFromServer,
  itemsOnPage,
}) => {
  if (isLoading) {
    const skeletonCount = itemsOnPage === 'all' ? 8 : Number(itemsOnPage);

    return (
      <div className={styles.productsList}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div
            key={index}
            className={styles.card}
          >
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

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
