import type { FC } from 'react';

import { ProductGallerySection } from '../ProductGallerySection';
import { ProductActionsSection } from '../ProductActionsSection';

import styles from './ProductOverviewSection.module.scss';
import type { DetailedProduct } from '../../../types/detailedProduct';

interface ProductOverviewSectionProps {
  product: DetailedProduct;
}

export const ProductOverviewSection: FC<ProductOverviewSectionProps> = ({
  product,
}) => {
  return (
    <section className={styles.productOverviewSection}>
      <ProductGallerySection
        images={product.images}
        productName={product.name}
      />
      <ProductActionsSection product={product} />{' '}
    </section>
  );
};
