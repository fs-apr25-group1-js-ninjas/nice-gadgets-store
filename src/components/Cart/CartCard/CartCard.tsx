import type { FC } from 'react';
import clsx from 'clsx';

import plus from '/icons/plus.svg';
import minus from '/icons/minus.svg';
import close from '/icons/close.svg';

import styles from './CartCard.module.scss';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onQuantityChange: (itemId: number, newQuantity: number) => void;
  onRemove: (itemId: number) => void;
}

export const CartCard: FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <article className={styles.cartCard}>
      <div className={styles.itemHeader}>
        <button
          onClick={() => onRemove(item.id)}
          className={styles.removeButton}
        >
          <img
            src={close}
            alt="CLOSE BUTTON IMG"
            className={clsx(styles.closeIcon, 'app-icon')}
          />
        </button>

        <div className={styles.containerItemImage}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
          />
        </div>

        <div className={styles.itemName}>
          <h3>{item.name}</h3>
        </div>
      </div>

      <div className={styles.quantityControl}>
        <div className={styles.addAndSubtructButtons}>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className={styles.minusBotton}
          >
            <img
              src={minus}
              alt="MINUS BUTTON IMG"
              className={styles.minusImg}
            />
          </button>

          <div className={styles.quantity}>{item.quantity}</div>

          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className={styles.plusBotton}
          >
            <img
              src={plus}
              alt="PLUSE BUTTON IMG"
              className={styles.plusImg}
            />
          </button>
        </div>

        <div className={styles.fullPrice}>${item.price * item.quantity}</div>
      </div>
    </article>
  );
};
