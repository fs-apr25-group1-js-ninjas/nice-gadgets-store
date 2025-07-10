import type { FC } from 'react';
import { CartCard } from '../../Cart/CartCard';
import styles from './CartListSection.module.scss';
import categoryPhonesImage from '/img/category-phones.png';

export const CartListSection: FC = () => {
  return (
    <section className={styles.cartList}>
      <CartCard
        item={{
          id: 1,
          name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
          price: 10,
          quantity: 1,
          imageUrl: categoryPhonesImage,
        }}
        onQuantityChange={() =>
          console.log('Quantity changed for hardcoded item 1')
        }
        onRemove={() => console.log('Item 1 removed (hardcoded)')}
      />

      <CartCard
        item={{
          id: 1,
          name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
          price: 13,
          quantity: 1,
          imageUrl: categoryPhonesImage,
        }}
        onQuantityChange={() =>
          console.log('Quantity changed for hardcoded item 1')
        }
        onRemove={() => console.log('Item 1 removed (hardcoded)')}
      />

      {/* <p className={styles.emptyCartMessage}>Ваш кошик порожній.</p> */}
    </section>
  );
};
