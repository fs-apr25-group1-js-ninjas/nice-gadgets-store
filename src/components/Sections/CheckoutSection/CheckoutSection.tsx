import type { FC } from 'react';
import styles from './CheckoutSection.module.scss';
import type { Product } from '../../../types/product';

type CheckoutSectionProps = {
  productsInCart: (Product & { quantity: number; price: number })[];
};

export const CheckoutSection: FC<CheckoutSectionProps> = ({
  productsInCart,
}) => {
  const totalItems = productsInCart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalPrice = productsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <section className={styles.checkOut}>
      <div className={styles.totalTitlePrice}>
        <h2>${totalPrice}</h2>
      </div>
      <div className={styles.totalTitleItems}>
        <p>Total for {totalItems} items </p>
      </div>
      <hr className={styles.line} />
      <button className={styles.checkoutButton}>Checkout</button>
    </section>
  );
};
