import styles from './ProductCard.module.scss';

import type { UnifiedProduct } from '../../../types/unifiedProduct';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../AddToCartButton';
import { FavoritesButton } from '../FavoritesButton/FavoritesButton';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';
import { useEffect, type FC } from 'react';

interface Props {
  product: UnifiedProduct;
  discount?: boolean;
}

export const ProductCard: FC<Props> = ({ product, discount }) => {
  const {
    addToCart,
    addToFavorites,
    cartValues,
    favoritesValues,
    loadFromStorage,
  } = useCartActionsStore();

  const inCart = Boolean(cartValues[product.id]);
  const isFavorited = favoritesValues.includes(product.id);

  useEffect(() => {
    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardEffect}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.cardLink}
        >
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.image}
          />

          <div className={styles.name}>
            <p>{product.name}</p>
          </div>

          <div className={styles.prices}>
            <p className={styles.price}>${product.price}</p>

            {discount && product.fullPrice > product.price && (
              <p className={styles.fullPrice}>${product.fullPrice}</p>
            )}
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
          <AddToCartButton
            onClick={() => addToCart(product.id)}
            inCart={inCart}
          />

          <FavoritesButton
            onClick={() => addToFavorites(product.id)}
            isActive={isFavorited}
          />
        </div>
      </div>
    </div>
  );
};
