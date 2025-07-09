// import { Card } from '../../Common/Card';
import styles from './ProductCard.module.scss';

import type { Product } from '../../../types/product';
import { Link } from 'react-router-dom';
import { useState, type FC } from 'react';
import { AddToCartButton } from '../AddToCartButton';
import { FavoritesButton } from '../FavoritesButton/FavoritesButton';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [cartIds, setCartIds] = useState<number[]>([]);

  const addToCart = () => {
    setCartIds([...cartIds, product.id]);
  };

  const [favIds, setFavIds] = useState<number[]>([]);

  const addToFavorites = () => {
    setFavIds((prev) =>
      prev.includes(product.id) ?
        prev.filter((id) => id !== product.id)
      : [...prev, product.id],
    );
    console.log(favIds);
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

      <div className={styles.actions}>
        <AddToCartButton onClick={addToCart}> Add to card</AddToCartButton>

        <FavoritesButton onClick={addToFavorites} />
      </div>
    </div>
  );

  // return <Card className={styles.ProductCard}>Product Card</Card>;
};
