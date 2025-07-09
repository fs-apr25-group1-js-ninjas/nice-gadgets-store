import type { FC } from 'react';
import styles from './AddToCartButton.module.scss';

type Props = {
  onClick: () => void;
};

export const AddToCartButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      Add to cart
    </button>
  );
};

// return <button className={styles.addToCartButton}>AddToCartButton</button>;
