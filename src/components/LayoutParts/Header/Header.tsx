import type { FC } from 'react';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import FavouritesIcon from '/icons/favourites.svg';
import CartIcon from '/icons/cart.svg';
import MenuIcon from '/icons/burger_menu.svg';
import CloseIcon from '/icons/close.svg';
import NiceGadgetsLogo from '/icons/nice_gadgets_logo.svg';
import { ThemeSwitcher } from '../../UI/ThemeSwitcher';
import clsx from 'clsx';

const MOBILE_BREAKPOINT = 639;

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobileView = windowWidth <= MOBILE_BREAKPOINT;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > MOBILE_BREAKPOINT && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add(styles['no-scroll']);
    } else {
      document.body.classList.remove(styles['no-scroll']);
    }

    return () => {
      document.body.classList.remove(styles['no-scroll']);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <NavLink
          to="/"
          className={styles.logoLink}
        >
          <img
            src={NiceGadgetsLogo}
            alt="Nice Gadgets Logo"
            className={clsx(styles.logo, 'app-logo')}
          />
        </NavLink>

        {!isMobileView && (
          <nav className={styles.navbarNav}>
            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>HOME</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>PHONES</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>TABLETS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>ACCESSORIES</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
        {!isMobileView && (
          <div className={styles.headerActions}>
            <ThemeSwitcher />
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ?
                  `${styles.actionBlock} ${styles.favouriteBlock} ${styles.activeActionBlock}`
                : `${styles.actionBlock} ${styles.favouriteBlock}`
              }
            >
              <img
                src={FavouritesIcon}
                alt="Favourites"
                className={clsx(styles.icon, 'app-icon')}
              />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ?
                  `${styles.actionBlock} ${styles.cartBlock} ${styles.activeActionBlock}`
                : `${styles.actionBlock} ${styles.cartBlock}`
              }
            >
              <img
                src={CartIcon}
                alt="Cart"
                className={clsx(styles.icon, 'app-icon')}
              />
            </NavLink>
          </div>
        )}

        {isMobileView && !isMobileMenuOpen && (
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            <img
              src={MenuIcon}
              alt="Open Menu"
              className={clsx(styles.menuIcon)}
            />
          </button>
        )}
      </div>

      {isMobileMenuOpen && isMobileView && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <NavLink
              to="/"
              className={styles.mobileLogoLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={NiceGadgetsLogo}
                alt="Nice Gadgets Logo"
                className={clsx(styles.mobileLogo, 'app-logo')}
              />
            </NavLink>
            <button
              className={styles.mobileMenuClose}
              onClick={toggleMobileMenu}
            >
              <img
                src={CloseIcon}
                alt="Close Menu"
                className={clsx(styles.mobileMenuCloseIcon, 'app-icon')}
              />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>HOME</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>PHONES</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>TABLETS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>ACCESSORIES</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <ThemeSwitcher />
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ?
                  `${styles.mobileActionIconLink} ${styles.activeMobileActionIconLink}`
                : styles.mobileActionIconLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.mobileIconWrapper}>
                <img
                  src={FavouritesIcon}
                  alt="Favourites"
                  className={clsx(styles.mobileActionIcon, 'app-icon')}
                />
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ?
                  `${styles.mobileActionIconLink} ${styles.activeMobileActionIconLink}`
                : styles.mobileActionIconLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.mobileIconWrapper}>
                <img
                  src={CartIcon}
                  alt="Cart"
                  className={clsx(styles.mobileActionIcon, 'app-icon')}
                />
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
