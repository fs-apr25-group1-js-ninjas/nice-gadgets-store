import type { FC } from 'react';

import { CartCard } from '../../Cart/CartCard';

import styles from './CartListSection.module.scss';

export const CartListSection: FC = () => {
  return (
    <section className={styles.cartList}>
      <CartCard />
    </section>
  );
};
