import type { FC } from 'react';
import styles from './CartPage.module.scss';
import { CartListSection } from '../../components/Sections/CartListSection';
import { CheckoutSection } from '../../components/Sections/CheckoutSection';
import arrow_left from '/icons/arrow_left.svg';
export const CartPage: FC = () => {
  return (
    <div className={styles.cart}>
      <div className={styles.backContainer}>
        <button className={styles.buttonToBack}>
          <img
            src={arrow_left}
            alt="BACK ARROW ICON"
            className={styles.backArrowIcon}
          />
          Back
        </button>
      </div>
      <h1 className={styles.pageTitle}>Cart</h1>
      <div className={styles.contentWrapper}>
        <CartListSection />

        <CheckoutSection />
      </div>
    </div>
  );
};
