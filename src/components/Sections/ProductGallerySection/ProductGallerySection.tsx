import type { FC } from 'react';
import { useState } from 'react';

import styles from './ProductGallerySection.module.scss';

interface ProductGallerySectionProps {
  images: string[];
  productName: string;
}

export const ProductGallerySection: FC<ProductGallerySectionProps> = ({
  images,
  productName,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={styles.productGallery}>Зображення продукту відсутні.</div>
    );
  }

  const currentImageSrc = `/${images[activeImageIndex]}`;

  return (
    <section className={styles.productGallery}>
      <ul className={styles.list}>
        {images.map((imgSrc, index) => (
          <li
            key={index}
            className={`${styles.item} ${index === activeImageIndex ? styles.active : ''}`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={`/${imgSrc}`}
              alt={`${productName} thumbnail ${index + 1}`}
              className={styles.thumbnail}
            />
          </li>
        ))}
      </ul>
      <div className={styles.imgBox}>
        <img
          src={currentImageSrc}
          alt={productName}
          className={styles.productImg}
        />
      </div>
    </section>
  );
};
