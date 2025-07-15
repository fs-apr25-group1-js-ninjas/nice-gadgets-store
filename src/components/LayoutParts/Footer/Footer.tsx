import type { FC } from 'react';
import clsx from 'clsx';

import logo from '/icons/nice_gadgets_logo.svg';
import arrowUpIcon from '/icons/arrow_up.svg';

import styles from './Footer.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerLogo}>
        <a href="#">
          <img
            src={logo}
            alt="NICE GADGETS LOGO"
            className={clsx(styles.logoImage, 'app-logo')}
          />
        </a>
      </div>

      <nav className={styles.footerNavigation}>
        <a
          href="#"
          className={styles.navLink}
        >
          Github
        </a>
        <a
          href="#"
          className={styles.navLink}
        >
          Contacts
        </a>
        <a
          href="#"
          className={styles.navLink}
        >
          Rights
        </a>
      </nav>

      <div
        className={styles.backToTopGroup}
        onClick={scrollToTop}
      >
        <span className={styles.backToTopText}>Back to top</span>
        <button
          className={styles.backToTopButton}
          aria-label="Back to top"
        >
          <img
            src={arrowUpIcon}
            alt="Up arrow"
            className={clsx(styles.arrowIcon, 'app-icon')}
          />
        </button>
      </div>
    </div>
  </footer>
);
