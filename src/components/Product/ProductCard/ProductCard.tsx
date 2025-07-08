// import { Card } from '../../Common/Card';

import type { FC } from 'react';
import iphone7Black00 from '../../../assets/images/phones/apple-iphone-7/black/00.webp';

import styles from './ProductCard.module.scss';

// import type { Product } from '../../../types/product';
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/product';

interface Props {
  product?: Product;
}

export const ProductCard: FC<Props> = () => {
  const product = {
    category: 'phones',
    itemId: 'apple-iphone-7-32gb-black',
    name: 'Apple iPhone 7 32GB Black',
    price: 375,
    screen: "4.7' IPS",
    capacity: '32GB',
    ram: '2GB',
    image: iphone7Black00,
  };
  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.cardLink}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />

        <p className={styles.name}>{product.name}</p>

        <div className={styles.prices}>
          <p className={styles.price}>${product.price}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.specs}>
          <div className={styles.row}>
            <span className={styles.key}>Screen</span>
            <span className={styles.value}>{product.screen}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.key}>Capacity</span>
            <span className={styles.value}>{product.capacity}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.key}>RAM</span>
            <span className={styles.value}>{product.ram}</span>
          </div>
        </div>
      </Link>
    </div>
  );

  // return <Card className={styles.ProductCard}>Product Card</Card>;
};
