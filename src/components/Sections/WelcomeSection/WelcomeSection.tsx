import type { FC } from 'react';
import styles from './WelcomeSection.module.scss';
import { HeroSlider } from '../../Sliders/HeroSlider';

export const WelcomeSection: FC = () => {
  return (
    <section className={styles.welcomeSection}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <HeroSlider />
    </section>
  );
};
