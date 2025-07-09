import type { FC } from 'react';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import FavouritesIcon from '/icons/favourites.svg';
import CartIcon from '/icons/cart.svg';
import MenuIcon from '/icons/burger_menu.svg';
import CloseIcon from '/icons/close.svg';
import NiceGadgetsLogo from '/icons/nice_gadgets_logo.svg';

const MOBILE_BREAKPOINT = 639;

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobileView = windowWidth <= MOBILE_BREAKPOINT;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
            className={styles.logo}
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
                className={styles.icon}
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
                className={styles.icon}
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
              className={styles.menuIcon}
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
                className={styles.mobileLogo}
              />
            </NavLink>
            <button
              className={styles.mobileMenuClose}
              onClick={toggleMobileMenu}
            >
              <img
                src={CloseIcon}
                alt="Close Menu"
                className={styles.mobileMenuCloseIcon}
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
                  className={styles.mobileActionIcon}
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
                  className={styles.mobileActionIcon}
                />
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
