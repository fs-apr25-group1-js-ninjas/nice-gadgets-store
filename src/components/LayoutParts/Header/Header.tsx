import type { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        Header
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/phones">Phones</Link>
            </li>
            <li>
              <Link to="/tablets">Tablets</Link>
            </li>
            <li>
              <Link to="/accessories">Accessories</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
