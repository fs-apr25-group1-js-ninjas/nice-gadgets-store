import type { FC } from 'react';
import styles from './ProductDescriptionSection.module.scss';
import { TechSpecsSection } from '../TechSpecsSection';
import { AboutSection } from '../AboutSection';

export const ProductDescriptionSection: FC = () => {
  return (
    <section className={styles.productDescriptionSection}>
      <AboutSection />
      <TechSpecsSection />
    </section>
  );
};
