import type { FC, ReactNode } from 'react';
import styles from './AddToCartButton.module.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const AddToCartButton: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// return <button className={styles.addToCartButton}>AddToCartButton</button>;
