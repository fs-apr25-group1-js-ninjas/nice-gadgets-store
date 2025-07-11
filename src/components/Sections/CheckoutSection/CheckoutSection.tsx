import type { FC } from 'react';
import styles from './CheckoutSection.module.scss';

export const CheckoutSection: FC = () => {
  return (
    <section className={styles.checkOut}>
      <div className={styles.totalTitlePrice}>
        <h2>$2657</h2>
      </div>
      <div className={styles.totalTitleItems}>
        <p>Total for 3 items</p>
      </div>
      <hr className={styles.line} />
      <button className={styles.checkoutButton}>Checkout</button>
    </section>
  );
};
