import type { FC } from 'react';
import productImg from '/img/phones/apple-iphone-11-pro-max/gold/00.webp';
import styles from './ProductGallerySection.module.scss';

export const ProductGallerySection: FC = () => {
  return (
    <section className={styles.productGallery}>
      <ul className={styles.list}>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
      </ul>
      <div className={styles.imgBox}>
        <img
          src={productImg}
          alt="product"
          className={styles.productImg}
        />
      </div>
    </section>
  );
};
