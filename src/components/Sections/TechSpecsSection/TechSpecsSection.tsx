import type { FC } from 'react';
import styles from './TechSpecsSection.module.scss';

export const TechSpecsSection: FC = () => {
  return (
    <section className={styles.techSpecsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tech specs</h2>
        <div className={styles.line}></div>
      </div>
      <div className={styles.info}>
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
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Built in memory</p>
          <p className={styles.text}>64 GB</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Camera</p>
          <p className={styles.text}>12 Mp + 12 Mp + 12 Mp (Triple)</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Zoom</p>
          <p className={styles.text}>Optical, 2x(Triple)</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.secondaryText}>Cell</p>
          <p className={styles.text}>GSM, LTE, UMTS</p>
        </div>
      </div>
    </section>
  );
};
