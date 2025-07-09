import type { FC } from 'react';
import styles from './ProductActionsSection.module.scss';

export const ProductActionsSection: FC = () => {
  return (
    <section className={styles.productActions}>
      <div className={styles.availableColors}>
        <p className={styles.secondaryText}>Available colors</p>
        <p className={styles.secondaryText}>ID: 802390</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.selectCapacity}>
        <p className={styles.secondaryText}>Select capacity</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.prices}>
        <p className={styles.priceDiscount}>$799</p>
        <p className={styles.priceRegular}>$1199</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buttonAdd}>Add to cart</button>
        <button className={styles.buttonFav}>1</button>
      </div>
      <div className={styles.shortInfo}>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Screen</p>
          <p className={styles.text}>6.5” OLED</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Resolution</p>
          <p className={styles.text}>2688x1242</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Processor</p>
          <p className={styles.text}>Apple A12 Bionic</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>RAM</p>
          <p className={styles.text}>3 GB</p>
        </div>
      </div>
    </section>
  );
};
