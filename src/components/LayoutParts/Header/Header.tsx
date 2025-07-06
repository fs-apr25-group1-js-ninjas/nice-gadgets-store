import type { FC } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        Header
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/phones">Phones</NavLink>
            </li>
            <li>
              <NavLink to="/tablets">Tablets</NavLink>
            </li>
            <li>
              <NavLink to="/accessories">Accessories</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
