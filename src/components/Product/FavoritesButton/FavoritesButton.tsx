import type { FC } from 'react';
import heartIcon from '/icons/favourites.svg';
import styles from './FavoritesButton.module.scss';

type Props = {
  onClick: () => void;
};

export const FavoritesButton: FC<Props> = () => {
  return (
    <button className={styles.favBtn}>
      <img
        src={heartIcon}
        alt="favorite"
      />
    </button>
  );
};

// return <button className={styles.FavoritesButton}>FavoritesButton</button>;
