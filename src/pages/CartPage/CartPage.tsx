import type { FC } from 'react';
import styles from './CartPage.module.scss';
import { CartListSection } from '../../components/Sections/CartListSection';
import { CheckoutSection } from '../../components/Sections/CheckoutSection';

export const CartPage: FC = () => {
  return (
    <div className={styles.cart}>
      <h1>Cart</h1>
      <CartListSection />
      <CheckoutSection />
    </div>
  );
};
