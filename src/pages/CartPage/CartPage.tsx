import type { FC } from 'react';

import { GoBackButton } from '../../components/GoBackButton';
import { CartListSection } from '../../components/Sections/CartListSection';
import { CheckoutSection } from '../../components/Sections/CheckoutSection';

import styles from './CartPage.module.scss';

export const CartPage: FC = () => {
  return (
    <div className={styles.cart}>
      <div className={styles.backContainer}>
        <GoBackButton />
      </div>
      <h1 className={styles.pageTitle}>Cart</h1>
      <div className={styles.contentWrapper}>
        <CartListSection />

        <CheckoutSection />
      </div>
    </div>
  );
};
