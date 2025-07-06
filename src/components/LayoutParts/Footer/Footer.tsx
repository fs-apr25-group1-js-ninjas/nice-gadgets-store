import type { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">Footer</div>
    </footer>
  );
};
